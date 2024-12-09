CREATE OR REPLACE FUNCTION check_mpay_balance() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the payment method is MPAY
    IF (NEW.idMetodeBayar IS NOT NULL) THEN
        -- Get the payment method name
        PERFORM Nama FROM METODE_BAYAR WHERE id = NEW.idMetodeBayar AND Nama = 'Mpay';

        -- If MPAY is used, check the user's balance
        IF FOUND THEN
            -- Check if the user's SALDOMPAY is sufficient
            PERFORM 1
            FROM USERTABLE
            WHERE ID = NEW.idPelanggan AND SALDOMPAY >= NEW.TotalBiaya;

            -- If insufficient balance, raise an exception
            IF NOT FOUND THEN
                RAISE EXCEPTION 'Insufficient MPAY balance for user %', NEW.idPelanggan;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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