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


CREATE OR REPLACE FUNCTION update_pelanggan_level(pelanggan_id UUID) RETURNS VOID AS $$
DECLARE
    transaksi_count INT;
BEGIN
    -- Count the number of transactions for the given pelanggan
    SELECT COUNT(*) INTO transaksi_count
    FROM TR_PEMESANAN_JASA
    WHERE idPelanggan = pelanggan_id;

    -- Update the LEVEL based on the number of transactions
    IF transaksi_count BETWEEN 1 AND 9 THEN
        UPDATE PELANGGAN SET LEVEL = 'Bronze' WHERE ID = pelanggan_id;
    ELSIF transaksi_count BETWEEN 10 AND 19 THEN
        UPDATE PELANGGAN SET LEVEL = 'Silver' WHERE ID = pelanggan_id;
    ELSIF transaksi_count >= 20 THEN
        UPDATE PELANGGAN SET LEVEL = 'Gold' WHERE ID = pelanggan_id;
    ELSE
        UPDATE PELANGGAN SET LEVEL = NULL WHERE ID = pelanggan_id; -- Default for 0 transactions
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION trigger_update_pelanggan_level() RETURNS TRIGGER AS $$
BEGIN
    -- Call the function to update the pelanggan's level
    PERFORM update_pelanggan_level(NEW.idPelanggan);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_insert_update_pemesanan AFTER
INSERT
OR
DELETE ON TR_PEMESANAN_JASA
FOR EACH ROW EXECUTE FUNCTION trigger_update_pelanggan_level();