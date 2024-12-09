CREATE OR REPLACE FUNCTION kembalikan_saldo_mypay() RETURNS TRIGGER AS $$
DECLARE
    nominal DECIMAL;
    userid UUID;
BEGIN

    IF NEW.IdStatus = (SELECT id FROM STATUS_PESANAN WHERE nama = 'Pesanan Dibatalkan') THEN
        SELECT TotalBiaya,
            idPelanggan INTO nominal,
                                userid
        FROM TR_PEMESANAN_JASA
        WHERE id = NEW.IdTrPemesanan;

        UPDATE USERTABLE
        SET SALDOMPAY = SALDOMPAY + nominal
        WHERE ID = userid;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_kembalikan_saldo AFTER
UPDATE OF idStatus ON TR_PEMESANAN_STATUS
FOR EACH ROW EXECUTE FUNCTION kembalikan_saldo_mypay();