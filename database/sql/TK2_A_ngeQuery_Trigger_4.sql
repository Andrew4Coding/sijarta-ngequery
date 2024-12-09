-- Trigger to check if pesanan selesai, tf mpay ke pekerja
CREATE OR REPLACE FUNCTION plus_saldo_on_selesai() RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_plus_saldo_on_selesai AFTER
UPDATE ON TR_PEMESANAN_STATUS
FOR EACH ROW EXECUTE FUNCTION plus_saldo_on_selesai();

CREATE TRIGGER after_insert_update_pemesanan AFTER
INSERT
OR
DELETE ON TR_PEMESANAN_JASA
FOR EACH ROW EXECUTE FUNCTION trigger_update_pelanggan_level();