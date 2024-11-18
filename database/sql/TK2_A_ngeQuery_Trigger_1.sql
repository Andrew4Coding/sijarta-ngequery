-- Bagian A

CREATE OR REPLACE FUNCTION check_phone_number_exists() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE phone_number = NEW.phone_number) THEN
        RAISE EXCEPTION 'Phone number already registered';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_phone_number
BEFORE INSERT ON "USER"
FOR EACH ROW EXECUTE FUNCTION check_phone_number_exists();

-- Bagian B

CREATE OR REPLACE FUNCTION check_bank_account_combination() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM workers
        WHERE bank_name = NEW.bank_name
        AND account_number = NEW.account_number
    ) THEN
        RAISE EXCEPTION 'Bank name and account number combination already registered for another worker';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_bank_account
BEFORE INSERT ON pekerja
FOR EACH ROW EXECUTE FUNCTION check_bank_account_combination();
