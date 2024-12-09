CREATE OR REPLACE FUNCTION cek_pembatasan_voucher() RETURNS TRIGGER AS $$
BEGIN
   IF
   (
       (SELECT kuotapelangganan FROM VOUCHER WHERE Kode = NEW.idDiskon LIMIT 1) *
       (SELECT COUNT(*) FROM TR_PEMBELIAN_VOUCHER WHERE IdVoucher = NEW.idDiskon AND IdPelanggan = NEW.IdPelanggan)
   ) <=
   (
       SELECT COUNT(*) FROM TR_PEMESANAN_JASA WHERE idDiskon = NEW.idDiskon AND IdPelanggan = NEW.IdPelanggan
   ) THEN
       RAISE EXCEPTION 'Voucher % telah mencapai batas kuota penggunaan', NEW.idDiskon;
   END IF;
   IF
   (
       (SELECT MAX(TglAkhir) FROM TR_PEMBELIAN_VOUCHER WHERE IdVoucher = NEW.idDiskon AND IdPelanggan = NEW.IdPelanggan)::DATE < NEW.TglPemesanan
   ) THEN
       RAISE EXCEPTION 'Voucher % telah melewati batas tanggal berlaku', NEW.idDiskon;
   END IF;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_cek_pembatasan_voucher
BEFORE
INSERT ON TR_PEMESANAN_JASA
FOR EACH ROW EXECUTE FUNCTION cek_pembatasan_voucher();


CREATE OR REPLACE FUNCTION update_pekerja_rating() RETURNS TRIGGER AS $$
BEGIN
    -- Update the rating of the pekerja based on the average rating in TESTIMONI
    UPDATE PEKERJA
    SET RATING = (
        SELECT AVG(Rating)
        FROM TESTIMONI T
        JOIN TR_PEMESANAN_JASA TPJ ON T.IdTrPemesanan = TPJ.Id
        WHERE TPJ.idPekerja = PEKERJA.Id
    )
    WHERE Id = (
        SELECT idPekerja
        FROM TR_PEMESANAN_JASA
        WHERE Id = NEW.IdTrPemesanan
    );

    -- Return the NEW record (inserted row)
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_update_pekerja_rating AFTER
INSERT ON TESTIMONI
FOR EACH ROW EXECUTE FUNCTION update_pekerja_rating();