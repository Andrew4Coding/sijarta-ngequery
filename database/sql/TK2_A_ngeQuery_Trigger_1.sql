-- Trigger to check if phone number already exists
CREATE OR REPLACE FUNCTION check_phone_number_exists() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the phone number exists in another record
    IF EXISTS (
        SELECT 1 
        FROM USERTABLE 
        WHERE nohp = NEW.nohp 
        AND id != NEW.id
    ) THEN
        RAISE EXCEPTION 'Phone number already registered';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_phone_number
BEFORE INSERT OR UPDATE ON USERTABLE
FOR EACH ROW EXECUTE FUNCTION check_phone_number_exists();

-- Trigger to check if npwp already exists
CREATE OR REPLACE FUNCTION check_npwp_exists() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM PEKERJA WHERE npwp = NEW.npwp AND id != NEW.id) THEN
        IF TG_OP = 'INSERT' THEN
            DELETE FROM USERTABLE WHERE id = NEW.id;
        END IF; -- Fixed here
        RAISE EXCEPTION 'NPWP already registered';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_npwp
BEFORE INSERT OR UPDATE ON PEKERJA
FOR EACH ROW EXECUTE FUNCTION check_npwp_exists();

-- Trigger to check if bank account combination already exists
CREATE OR REPLACE FUNCTION check_bank_account_combination() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM PEKERJA
        WHERE namabank = NEW.namabank
        AND nomorrekening = NEW.nomorrekening
        AND id != NEW.id
    ) THEN
        IF TG_OP = 'INSERT' THEN
            DELETE FROM USERTABLE WHERE id = NEW.id;
        END IF; -- Fixed here
        RAISE EXCEPTION 'Bank name and account number combination already registered for another worker';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_bank_account
BEFORE INSERT OR UPDATE ON PEKERJA
FOR EACH ROW EXECUTE FUNCTION check_bank_account_combination();

-- Trigger to check if pesanan selesai, tf mpay ke pekerja
CREATE OR REPLACE FUNCTION plus_saldo_on_selesai()
RETURNS trigger AS 
$$
    DECLARE
    nominal DECIMAL;
    pekerjaId UUID;
    kategoriId UUID;
    BEGIN
    IF NEW.IdStatus = (SELECT id FROM STATUS_PESANAN WHERE nama = 'Pesanan Selesai') 
    THEN
        SELECT IdPekerja, TotalBiaya
            INTO pekerjaId, nominal
            FROM TR_PEMESANAN_JASA TJ
            WHERE NEW.IdTrPemesanan = TJ.id;
        UPDATE USERTABLE 
            SET SALDOMPAY = SALDOMPAY + nominal
            WHERE USERTABLE.Id = pekerjaId;
        SELECT id
            INTO kategoriId
            FROM KATEGORI_TR_MPAY
            WHERE nama = 'Menerima Honor Transaksi Jasa';
        INSERT INTO TR_MPAY (Id, UserId, Tgl, Nominal, KategoriId)
        VALUES (
            gen_random_uuid(),
            pekerjaId,
            CURRENT_DATE,
            nominal,
            kategoriId
        );
    END IF;
    RETURN NEW;
    END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_plus_saldo_on_selesai
AFTER UPDATE ON TR_PEMESANAN_STATUS
FOR EACH ROW
EXECUTE FUNCTION plus_saldo_on_selesai();