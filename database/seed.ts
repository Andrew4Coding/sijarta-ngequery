import pool from "./db";

export async function resetDatabase() {
    await pool.query(`
        DROP TABLE IF EXISTS TR_PEMBELIAN_VOUCHER;
        DROP TABLE IF EXISTS PROMO;
        DROP TABLE IF EXISTS VOUCHER;
        DROP TABLE IF EXISTS TESTIMONI;
        DROP TABLE IF EXISTS TR_PEMESANAN_STATUS;
        DROP TABLE IF EXISTS STATUS_PESANAN;
        DROP TABLE IF EXISTS TR_PEMESANAN_JASA;
        DROP TABLE IF EXISTS METODE_BAYAR;
        DROP TABLE IF EXISTS DISKON;
        DROP TABLE IF EXISTS SESI_LAYANAN;
        DROP TABLE IF EXISTS SUBKATEGORI_JASA;
        DROP TABLE IF EXISTS PEKERJA_KATEGORI_JASA;
        DROP TABLE IF EXISTS KATEGORI_JASA;
        DROP TABLE IF EXISTS TR_MPAY;
        DROP TABLE IF EXISTS KATEGORI_TR_MPAY;
        DROP TABLE IF EXISTS PEKERJA;
        DROP TABLE IF EXISTS PELANGGAN;
        DROP TABLE IF EXISTS USERTABLE;
    `);

    console.log('Reset database done!');
}

export async function createTable() {
    await pool.query(`
        CREATE TABLE USERTABLE (
            ID UUID PRIMARY KEY,
            NAMA VARCHAR(255),
            JENISKELAMIN VARCHAR(1) CHECK(JENISKELAMIN IN ('L', 'P')),
            NOHP VARCHAR(15),  -- ASUMSI: Nomor HP maksimal 15 digit
            PWD VARCHAR(255),
            TGLLAHIR DATE,
            ALAMAT VARCHAR(255),
            SESSION_ID UUID DEFAULT NULL,
            SALDOMPAY DECIMAL
        );

        CREATE TABLE PELANGGAN (
            ID UUID UNIQUE PRIMARY KEY,
            LEVEL VARCHAR(10),
            FOREIGN KEY (ID) REFERENCES USERTABLE(ID)
        );

        CREATE TABLE PEKERJA (
            ID UUID UNIQUE PRIMARY KEY,
            NAMABANK VARCHAR(50),
            NOMORREKENING VARCHAR(20), -- ASUMSI: Nomor rekening maksimal 20 digit
            NPWP VARCHAR(20), -- ASUMSI: Bahwa NPWP maksimal 20 digit (Sesuai dengan format NPWP)
            LINKFOTO VARCHAR(255),
            RATING FLOAT,
            JUMLAHPESANANASELESAI INT,
            FOREIGN KEY (ID) REFERENCES USERTABLE(ID)
        );

        CREATE TABLE KATEGORI_TR_MPAY (
            ID UUID PRIMARY KEY,
            NAMA VARCHAR(100)
        );

        CREATE TABLE TR_MPAY (
            ID UUID PRIMARY KEY,
            USERID UUID,
            TGL DATE,
            NOMINAL DECIMAL,
            KATEGORIID UUID,
            FOREIGN KEY (USERID) REFERENCES USERTABLE(ID),
            FOREIGN KEY (KATEGORIID) REFERENCES KATEGORI_TR_MPAY(ID)
        );

        CREATE TABLE KATEGORI_JASA (
            Id UUID PRIMARY KEY,
            NamaKategori VARCHAR
        );

        CREATE TABLE PEKERJA_KATEGORI_JASA (
            PekerjaId UUID,
            KategoriJasaId UUID,
            PRIMARY KEY (PekerjaId, KategoriJasaId),
            FOREIGN KEY (PekerjaId) REFERENCES PEKERJA(Id) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (KategoriJasaId) REFERENCES KATEGORI_JASA(Id) ON DELETE RESTRICT ON UPDATE CASCADE
        );

        CREATE TABLE SUBKATEGORI_JASA (
            Id UUID PRIMARY KEY,
            NamaSubkategori VARCHAR,
            Deskripsi TEXT,
            KategoriJasaId UUID,
            FOREIGN KEY (KategoriJasaId) REFERENCES KATEGORI_JASA(Id)
        );

        CREATE TABLE SESI_LAYANAN (
            SubkategoriId UUID,
            Sesi INT,
            Harga DECIMAL,
            PRIMARY KEY (SubkategoriId, Sesi),
            FOREIGN KEY (SubkategoriId) REFERENCES SUBKATEGORI_JASA(Id)
        );

        CREATE TABLE DISKON (
            Kode VARCHAR(50) PRIMARY KEY,
            Potongan DECIMAL NOT NULL CHECK (Potongan >= 0),
            MinTrPemesanan INT NOT NULL CHECK (MinTrPemesanan >= 0)
        );

        CREATE TABLE METODE_BAYAR (
            id UUID PRIMARY KEY,
            Nama VARCHAR NOT NULL
        );

        CREATE TABLE TR_PEMESANAN_JASA (
            id UUID PRIMARY KEY NOT NULL UNIQUE,
            TglPemesanan DATE NOT NULL,
            TglPekerjaan DATE,
            WaktuPekerjaan TIMESTAMP,
            TotalBiaya DECIMAL NOT NULL CHECK (TotalBiaya >= 0),
            idPelanggan UUID,
            idPekerja UUID,
            idKategoriJasa UUID,
            Sesi INT,
            idDiskon VARCHAR(50),
            idMetodeBayar UUID,
            FOREIGN KEY (idPelanggan) REFERENCES PELANGGAN(id) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idPekerja) REFERENCES PEKERJA(id) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idKategoriJasa, Sesi) REFERENCES SESI_LAYANAN(SubkategoriId, Sesi) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idDiskon) REFERENCES DISKON(Kode) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idMetodeBayar) REFERENCES METODE_BAYAR(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );

        CREATE TABLE STATUS_PESANAN (
            id UUID PRIMARY KEY,
            Nama VARCHAR NOT NULL
        );

        CREATE TABLE TR_PEMESANAN_STATUS (
            IdTrPemesanan UUID,
            idStatus UUID,
            TglWaktu TIMESTAMP NOT NULL,
            PRIMARY KEY (IdTrPemesanan, idStatus),
            FOREIGN KEY (idTrPemesanan) REFERENCES TR_PEMESANAN_JASA(id) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idStatus) REFERENCES STATUS_PESANAN(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );

        CREATE TABLE TESTIMONI (
            IdTrPemesanan UUID,
            Tgl DATE NOT NULL,
            Teks TEXT NOT NULL,
            Rating INT NOT NULL default 0 CHECK (Rating >= 0 AND Rating <= 5), -- Asumsi: Rating antara 0-5
            PRIMARY KEY (IdTrPemesanan, Tgl),
            FOREIGN KEY (IdTrPemesanan) REFERENCES TR_PEMESANAN_JASA(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );

        CREATE TABLE VOUCHER (
            Kode VARCHAR(50) PRIMARY KEY,
            JmlHariBerlaku INT NOT NULL CHECK (JmlHariBerlaku >= 0),
            KuotaPelangganan INT,
            Harga DECIMAL NOT NULL CHECK (Harga >= 0),
            FOREIGN KEY (Kode) REFERENCES DISKON(Kode)
        );

        CREATE TABLE PROMO (
            Kode VARCHAR(50) PRIMARY KEY,
            TglAkhirBerlaku DATE NOT NULL,
            FOREIGN KEY (Kode) REFERENCES DISKON(Kode)
        );

        CREATE TABLE TR_PEMBELIAN_VOUCHER (
            Id UUID PRIMARY KEY,
            TglAwal DATE NOT NULL,
            TglAkhir DATE NOT NULL,
            TelahDigunakan INT NOT NULL CHECK (TelahDigunakan >= 0),
            IdPelanggan UUID,
            IdVoucher VARCHAR(50),
            IdMetodeBayar UUID,
            FOREIGN KEY (IdPelanggan) REFERENCES PELANGGAN(Id),
            FOREIGN KEY (IdVoucher) REFERENCES VOUCHER(Kode),
            FOREIGN KEY (IdMetodeBayar) REFERENCES METODE_BAYAR(Id)
        );
    `);

    console.log("Table created successfully");
}

export async function seedDatabase() {
    await pool.query(`
        -- INSERT DATA DUMMY
        -- AILEEN
        INSERT INTO USERTABLE (ID, NAMA, JENISKELAMIN, NOHP, PWD, TGLLAHIR, ALAMAT, SALDOMPAY) VALUES
        ('1c3e0100-1234-5678-8901-abcdefabcdef', 'Ali Rahman', 'L', '081234567890', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1990-05-14', 'Jl. Merdeka No. 1', 100000.00),
        ('2f5e0101-2234-5678-8902-bcdefbcdefbc', 'Budi Santoso', 'L', '081234567891', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1985-09-23', 'Jl. Angkasa No. 2', 250000.00),
        ('3a7e0102-3234-5678-8903-cdefccdefcde', 'Citra Sari', 'P', '081234567892', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1992-11-03', 'Jl. Mawar No. 3', 50000.00),
        ('4d8e0103-4234-5678-8904-ddefdddefdde', 'Dewi Lestari', 'P', '081234567893', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1989-07-21', 'Jl. Melati No. 4', 150000.00),
        ('5b9e0104-5234-5678-8905-eefeeedefeef', 'Eko Wijaya', 'L', '081234567894', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1993-04-10', 'Jl. Cemara No. 5', 200000.00),
        ('6fae0105-6234-5678-8906-ffeeffefefef', 'Fitri Hasanah', 'P', '081234567895', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1991-02-16', 'Jl. Kenanga No. 6', 75000.00),
        ('7ebe0106-7234-5678-8907-001100112223', 'Gilang Saputra', 'L', '081234567896', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1988-08-18', 'Jl. Teratai No. 7', 125000.00),
        ('8ace0107-8234-5678-8908-113322114455', 'Hendra Wijaya', 'L', '081234567897', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1987-12-30', 'Jl. Bunga No. 8', 175000.00),
        ('9bde0108-9234-5678-8909-225544226677', 'Indah Puspita', 'P', '081234567898', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1994-03-19', 'Jl. Anggrek No. 9', 125000.00),
        ('acd10109-1234-5678-8910-337766338899', 'Joko Subandi', 'L', '081234567899', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1995-06-28', 'Jl. Kamboja No. 10', 100000.00),
        ('acd10109-1234-5678-8910-337766338898', 'Andrew Devito Aryo', 'L', '08123456789', '$2a$10$9PlxjrHZxRPjUPwJ3yoq1O4CYCrUMc2JYi6QDppLNFUhWDsbsWVUe', '1995-06-28', 'Jl. Kamboja No. 10', 100000.00);

        INSERT INTO PELANGGAN (ID, LEVEL) VALUES
        ('1c3e0100-1234-5678-8901-abcdefabcdef', 'Silver'),
        ('2f5e0101-2234-5678-8902-bcdefbcdefbc', 'Gold'),
        ('3a7e0102-3234-5678-8903-cdefccdefcde', 'Bronze'),
        ('4d8e0103-4234-5678-8904-ddefdddefdde', 'Silver'),
        ('5b9e0104-5234-5678-8905-eefeeedefeef', 'Gold'),
        ('acd10109-1234-5678-8910-337766338898', 'Gold');

        INSERT INTO PEKERJA (ID, NAMABANK, NOMORREKENING, NPWP, LINKFOTO, RATING, JUMLAHPESANANASELESAI) VALUES
        ('6fae0105-6234-5678-8906-ffeeffefefef', 'Virtual Account BCA', '1234567890', '1234567890123456', 'https://sijarta-ngequery.s3.ap-southeast-2.amazonaws.com/pekerja1.png', 4.5, 150),
        ('7ebe0106-7234-5678-8907-001100112223', 'Virtual Account Mandiri', '2345678901', '2345678901234567', 'https://sijarta-ngequery.s3.ap-southeast-2.amazonaws.com/pekerja2.png', 4.8, 200),
        ('8ace0107-8234-5678-8908-113322114455', 'Virtual Account BNI', '3456789012', '3456789012345678', 'https://sijarta-ngequery.s3.ap-southeast-2.amazonaws.com/pekerja3.png', 4.6, 180),
        ('9bde0108-9234-5678-8909-225544226677', 'OVO', '4567890123', '4567890123456789', 'https://sijarta-ngequery.s3.ap-southeast-2.amazonaws.com/pekerja4.png', 4.7, 190),
        ('acd10109-1234-5678-8910-337766338899', 'Gopay', '5678901234', '5678901234567890', 'https://sijarta-ngequery.s3.ap-southeast-2.amazonaws.com/pekerja5.png', 4.9, 220);

        INSERT INTO KATEGORI_TR_MPAY (ID, NAMA) VALUES
        ('111e0110-1234-5678-8911-abcdefabcdef', 'TopUp MyPay'),
        ('222e0111-2234-5678-8912-bcdefbcdefbc', 'Membayar Transaksi'),
        ('333e0112-3234-5678-8913-cdefccdefcde', 'Transfer MyPay'),
        ('444e0113-4234-5678-8914-ddefdddefdde', 'Withdrawal'),
        ('555e0114-5234-5678-8915-eefeeedefeef', 'Pengembalian Dana'),
        ('666e0115-6234-5678-8916-ffefffefefef', 'Pembayaran Voucher'),
        ('777e0116-7234-5678-8917-001100112223', 'Terima Transfer');

        INSERT INTO TR_MPAY (ID, USERID, TGL, NOMINAL, KATEGORIID) VALUES
        ('111f0115-1234-5678-8916-abcdefabcdef', '1c3e0100-1234-5678-8901-abcdefabcdef', '2024-07-01', 50000.00,  '111e0110-1234-5678-8911-abcdefabcdef'),
        ('222f0116-2234-5678-8917-bcdefbcdefbc', '2f5e0101-2234-5678-8902-bcdefbcdefbc', '2024-07-03', 100000.00, '222e0111-2234-5678-8912-bcdefbcdefbc'),
        ('333f0117-3234-5678-8918-cdefccdefcde', '3a7e0102-3234-5678-8903-cdefccdefcde', '2024-07-05', 75000.00,  '333e0112-3234-5678-8913-cdefccdefcde'),
        ('444f0118-4234-5678-8919-ddefdddefdde', '4d8e0103-4234-5678-8904-ddefdddefdde', '2024-07-07', 120000.00, '444e0113-4234-5678-8914-ddefdddefdde'),
        ('555f0119-5234-5678-8920-eefeeedefeef', '5b9e0104-5234-5678-8905-eefeeedefeef', '2024-07-09', 200000.00,'555e0114-5234-5678-8915-eefeeedefeef'),
        ('111f0120-1234-5678-8921-abcdefabcdef', '6fae0105-6234-5678-8906-ffeeffefefef', '2024-07-11', 50000.00,  '111e0110-1234-5678-8911-abcdefabcdef'),
        ('222f0121-2234-5678-8922-bcdefbcdefbc', '7ebe0106-7234-5678-8907-001100112223', '2024-07-13', 100000.00, '222e0111-2234-5678-8912-bcdefbcdefbc'),
        ('333f0122-3234-5678-8923-cdefccdefcde', '8ace0107-8234-5678-8908-113322114455', '2024-07-15', 75000.00,  '333e0112-3234-5678-8913-cdefccdefcde'),
        ('444f0123-4234-5678-8924-ddefdddefdde', '9bde0108-9234-5678-8909-225544226677', '2024-07-17', 120000.00, '444e0113-4234-5678-8914-ddefdddefdde'),
        ('555f0124-5234-5678-8925-eefeeedefeef', 'acd10109-1234-5678-8910-337766338899', '2024-07-19', 200000.00,'555e0114-5234-5678-8915-eefeeedefeef'),
        ('111f0125-1234-5678-8926-abcdefabcdef', '1c3e0100-1234-5678-8901-abcdefabcdef', '2024-07-20', 150000.00, '111e0110-1234-5678-8911-abcdefabcdef'),
        ('222f0126-2234-5678-8927-bcdefbcdefbc', '2f5e0101-2234-5678-8902-bcdefbcdefbc', '2024-07-22', 200000.00, '222e0111-2234-5678-8912-bcdefbcdefbc'),
        ('333f0127-3234-5678-8928-cdefccdefcde', '3a7e0102-3234-5678-8903-cdefccdefcde', '2024-07-24', 100000.00, '333e0112-3234-5678-8913-cdefccdefcde'),
        ('444f0128-4234-5678-8929-ddefdddefdde', '4d8e0103-4234-5678-8904-ddefdddefdde', '2024-07-26', 250000.00, '444e0113-4234-5678-8914-ddefdddefdde'),
        ('555f0129-5234-5678-8930-eefeeedefeef', '5b9e0104-5234-5678-8905-eefeeedefeef', '2024-07-28', 50000.00, '555e0114-5234-5678-8915-eefeeedefeef'),
        ('111f0130-1234-5678-8931-abcdefabcdef', '6fae0105-6234-5678-8906-ffeeffefefef', '2024-07-30', 100000.00, '111e0110-1234-5678-8911-abcdefabcdef'),
        ('222f0131-2234-5678-8932-bcdefbcdefbc', '7ebe0106-7234-5678-8907-001100112223', '2024-08-01', 75000.00,  '222e0111-2234-5678-8912-bcdefbcdefbc'),
        ('333f0132-3234-5678-8933-cdefccdefcde', '8ace0107-8234-5678-8908-113322114455', '2024-08-03', 120000.00, '333e0112-3234-5678-8913-cdefccdefcde'),
        ('444f0133-4234-5678-8934-ddefdddefdde', '9bde0108-9234-5678-8909-225544226677', '2024-08-05', 50000.00,  '444e0113-4234-5678-8914-ddefdddefdde'),
        ('555f0134-5234-5678-8935-eefeeedefeef', 'acd10109-1234-5678-8910-337766338899', '2024-08-07', 100000.00,'555e0114-5234-5678-8915-eefeeedefeef'),
        ('111f0135-1234-5678-8936-abcdefabcdef', '1c3e0100-1234-5678-8901-abcdefabcdef', '2024-08-09', 150000.00, '111e0110-1234-5678-8911-abcdefabcdef'),
        ('222f0136-2234-5678-8937-bcdefbcdefbc', '2f5e0101-2234-5678-8902-bcdefbcdefbc', '2024-08-11', 200000.00, '222e0111-2234-5678-8912-bcdefbcdefbc'),
        ('333f0137-3234-5678-8938-cdefccdefcde', '3a7e0102-3234-5678-8903-cdefccdefcde', '2024-08-13', 100000.00, '333e0112-3234-5678-8913-cdefccdefcde'),
        ('444f0138-4234-5678-8939-ddefdddefdde', '4d8e0103-4234-5678-8904-ddefdddefdde', '2024-08-15', 250000.00, '444e0113-4234-5678-8914-ddefdddefdde'),
        ('555f0139-5234-5678-8940-eefeeedefeef', '5b9e0104-5234-5678-8905-eefeeedefeef', '2024-08-17', 50000.00, '555e0114-5234-5678-8915-eefeeedefeef');

        -- Tristan
        INSERT INTO KATEGORI_JASA (id, namakategori) VALUES
        ('bb99a16c-e03d-4202-b403-112de1c3d475', 'Home Cleaning'),
        ('946ff62a-3af1-4084-9b5a-2536f0ecbe38', 'Deep Cleaning'),
        ('a7c6eabd-2cc7-4a3f-bf46-d244eacb183d', 'Vacuum Extra'),
        ('869fa437-6914-4607-a712-1e4649c720c0', 'Laundry Extra'),
        ('b802fef3-6096-4618-b198-259105fc478a', 'Extra Clean');

        INSERT INTO PEKERJA_KATEGORI_JASA (pekerjaid, kategorijasaid) VALUES
        ('6fae0105-6234-5678-8906-ffeeffefefef', 'bb99a16c-e03d-4202-b403-112de1c3d475'),
        ('6fae0105-6234-5678-8906-ffeeffefefef', 'a7c6eabd-2cc7-4a3f-bf46-d244eacb183d'),
        ('7ebe0106-7234-5678-8907-001100112223', '946ff62a-3af1-4084-9b5a-2536f0ecbe38'),
        ('7ebe0106-7234-5678-8907-001100112223', 'b802fef3-6096-4618-b198-259105fc478a'),
        ('8ace0107-8234-5678-8908-113322114455', '869fa437-6914-4607-a712-1e4649c720c0'),
        ('8ace0107-8234-5678-8908-113322114455', 'bb99a16c-e03d-4202-b403-112de1c3d475'),
        ('9bde0108-9234-5678-8909-225544226677', '946ff62a-3af1-4084-9b5a-2536f0ecbe38'),
        ('9bde0108-9234-5678-8909-225544226677', 'b802fef3-6096-4618-b198-259105fc478a'),
        ('acd10109-1234-5678-8910-337766338899', 'a7c6eabd-2cc7-4a3f-bf46-d244eacb183d'),
        ('acd10109-1234-5678-8910-337766338899', '869fa437-6914-4607-a712-1e4649c720c0');

        INSERT INTO SUBKATEGORI_JASA (id, namasubkategori, deskripsi, kategorijasaid) VALUES
        ('b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 'Pembersihan Ruang Tamu', 'Membersihkan ruang tamu secara menyeluruh, termasuk menyedot debu, membersihkan permukaan, dan merapikan.', 'bb99a16c-e03d-4202-b403-112de1c3d475'),
        ('2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 'Pembersihan Kamar Tidur', 'Pembersihan kamar tidur secara menyeluruh, termasuk merapikan tempat tidur dan membersihkan debu.', 'bb99a16c-e03d-4202-b403-112de1c3d475'),
        ('e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 'Pembersihan Dapur Intensif', 'Membersihkan dapur secara mendalam, termasuk kompor, meja dapur, dan wastafel.', '946ff62a-3af1-4084-9b5a-2536f0ecbe38'),
        ('ce3a2e4c-0fb3-4564-a0af-471e2c01a8e7', 'Pembersihan Kamar Mandi', 'Membersihkan kamar mandi dengan menyikat lantai, dinding, dan wastafel agar bersih dan higienis.', '946ff62a-3af1-4084-9b5a-2536f0ecbe38'),
        ('f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 'Penyedotan Debu Karpet', 'Layanan penyedotan debu khusus untuk karpet dan permadani agar bebas dari kotoran dan debu.', 'a7c6eabd-2cc7-4a3f-bf46-d244eacb183d'),
        ('1c9d4d54-fd33-4f26-8cb2-b6b547fdd611', 'Penyedotan Debu Sofa', 'Layanan vakum untuk membersihkan debu dan kotoran dari sofa dan kursi berbahan kain.', 'a7c6eabd-2cc7-4a3f-bf46-d244eacb183d'),
        ('f822f3da-7f77-4a54-8a35-7fc46b46c7f4', 'Laundry Pakaian dan Seprai', 'Layanan pencucian dan setrika untuk pakaian, seprai, dan kain rumah tangga lainnya.', '869fa437-6914-4607-a712-1e4649c720c0'),
        ('d6bcda96-ec16-44de-8393-55d24a2f36f0', 'Laundry Kain Tebal', 'Layanan pencucian khusus untuk kain tebal seperti selimut, gorden, dan bedcover.', '869fa437-6914-4607-a712-1e4649c720c0'),
        ('b14b3459-6e12-4a73-824e-31b621dcb712', 'Pembersihan Kaca Jendela', 'Layanan pembersihan kaca jendela, cermin, dan permukaan kaca lainnya untuk hasil yang mengkilap.', 'b802fef3-6096-4618-b198-259105fc478a'),
        ('bf98b6a7-c4b4-492d-95b6-78b76df40c29', 'Pembersihan Permukaan Meja', 'Membersihkan meja, rak, dan permukaan lain di rumah dari debu dan noda.', 'b802fef3-6096-4618-b198-259105fc478a');

        INSERT INTO SESI_LAYANAN (subkategoriid, sesi, harga) VALUES
        ('b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 1, 50000),
        ('b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 2, 55000),
        ('b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 3, 60000),
        ('2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 1, 45000),
        ('2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 2, 50000),
        ('2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 3, 55000),
        ('e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 1, 75000),
        ('e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 2, 80000),
        ('e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 3, 85000),
        ('ce3a2e4c-0fb3-4564-a0af-471e2c01a8e7', 1, 70000),
        ('ce3a2e4c-0fb3-4564-a0af-471e2c01a8e7', 2, 75000),
        ('ce3a2e4c-0fb3-4564-a0af-471e2c01a8e7', 3, 80000),
        ('f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 1, 35000),
        ('f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 2, 38000),
        ('f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 3, 40000),
        ('1c9d4d54-fd33-4f26-8cb2-b6b547fdd611', 1, 32000),
        ('1c9d4d54-fd33-4f26-8cb2-b6b547fdd611', 2, 35000),
        ('1c9d4d54-fd33-4f26-8cb2-b6b547fdd611', 3, 37000),
        ('f822f3da-7f77-4a54-8a35-7fc46b46c7f4', 1, 45000),
        ('f822f3da-7f77-4a54-8a35-7fc46b46c7f4', 2, 48000),
        ('f822f3da-7f77-4a54-8a35-7fc46b46c7f4', 3, 50000),
        ('d6bcda96-ec16-44de-8393-55d24a2f36f0', 1, 52000),
        ('d6bcda96-ec16-44de-8393-55d24a2f36f0', 2, 55000),
        ('d6bcda96-ec16-44de-8393-55d24a2f36f0', 3, 58000),
        ('b14b3459-6e12-4a73-824e-31b621dcb712', 1, 45000),
        ('b14b3459-6e12-4a73-824e-31b621dcb712', 2, 47000),
        ('b14b3459-6e12-4a73-824e-31b621dcb712', 3, 50000),
        ('bf98b6a7-c4b4-492d-95b6-78b76df40c29', 1, 40000),
        ('bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 42000),
        ('bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 45000);

        -- ANDREW
        INSERT INTO DISKON (Kode, Potongan, MinTrPemesanan) VALUES
        ('DISKON001', 10.50, 100),
        ('DISKON002', 15.00, 200),
        ('DISKON003', 7.25, 50),
        ('DISKON004', 20.00, 150),
        ('DISKON005', 5.00, 75),
        ('DISKON006', 12.75, 120),
        ('DISKON007', 18.50, 300),
        ('DISKON008', 6.00, 80),
        ('DISKON009', 22.00, 250),
        ('DISKON010', 8.75, 130),
        ('DISKON011', 9.50, 100),
        ('DISKON012', 14.25, 180),
        ('DISKON013', 11.00, 90),
        ('DISKON014', 16.75, 220),
        ('DISKON015', 13.00, 160),
        ('DISKON016', 19.25, 280),
        ('DISKON017', 10.00, 110),
        ('DISKON018', 21.50, 240),
        ('DISKON019', 17.00, 200),
        ('DISKON020', 5.75, 60);

        INSERT INTO VOUCHER (Kode, JmlHariBerlaku, KuotaPelangganan, Harga) VALUES
        ('DISKON001', 30, 100, 1000.00),
        ('DISKON002', 60, 50, 1500.00),
        ('DISKON003', 45, 200, 750.00),
        ('DISKON004', 90, 500, 2000.00),
        ('DISKON005', 15, 300, 500.00),
        ('DISKON006', 60, 100, 1250.00),
        ('DISKON007', 30, 150, 1800.00),
        ('DISKON008', 90, 50, 600.00),
        ('DISKON009', 120, 250, 2200.00),
        ('DISKON010', 75, 300, 1300.00);

        INSERT INTO PROMO (Kode, TglAkhirBerlaku) VALUES
        ('DISKON011', '2024-11-30'),
        ('DISKON012', '2024-10-31'),
        ('DISKON013', '2024-09-30'),
        ('DISKON014', '2024-08-31'),
        ('DISKON015', '2024-07-31'),
        ('DISKON016', '2024-06-30'),
        ('DISKON017', '2024-05-31'),
        ('DISKON018', '2024-04-30'),
        ('DISKON019', '2024-03-31'),
        ('DISKON020', '2024-12-31');

        -- Anindya
        INSERT INTO METODE_BAYAR (id, Nama) VALUES
        ('550e8400-e29b-41d4-a716-446655440012', 'OVO'),
        ('123e4567-e89b-12d3-a456-426614174201', 'DANA'),
        ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'MPay'),
        ('3e8f9b83-62b7-4031-8e53-8d93b69375d2', 'GoPay'),
        ('c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73', 'LinkAja'),
        ('d2c3c141-0c38-4f21-a00b-8b0f58a33a65', 'ShopeePay');

        INSERT INTO TR_PEMBELIAN_VOUCHER (Id, TglAwal, TglAkhir, TelahDigunakan, IdPelanggan, IdVoucher, IdMetodeBayar) VALUES
        ('111e8400-e29b-41d4-a716-446655440001', '2024-09-01', '2024-09-30', 0, '1c3e0100-1234-5678-8901-abcdefabcdef', 'DISKON001', '550e8400-e29b-41d4-a716-446655440012'),
        ('111e8400-e29b-41d4-a716-446655440002', '2024-09-15', '2024-10-15', 1, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'DISKON002', '123e4567-e89b-12d3-a456-426614174201'),
        ('111e8400-e29b-41d4-a716-446655440003', '2024-10-01', '2024-10-31', 0, '3a7e0102-3234-5678-8903-cdefccdefcde', 'DISKON003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('111e8400-e29b-41d4-a716-446655440004', '2024-08-01', '2024-09-30', 2, '4d8e0103-4234-5678-8904-ddefdddefdde', 'DISKON004', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('111e8400-e29b-41d4-a716-446655440005', '2024-10-05', '2024-10-20', 0, '5b9e0104-5234-5678-8905-eefeeedefeef', 'DISKON005', 'c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73'),
        ('111e8400-e29b-41d4-a716-446655440006', '2024-07-01', '2024-09-01', 3, '1c3e0100-1234-5678-8901-abcdefabcdef', 'DISKON006', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('111e8400-e29b-41d4-a716-446655440007', '2024-06-15', '2024-09-15', 0, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'DISKON007', '550e8400-e29b-41d4-a716-446655440012'),
        ('111e8400-e29b-41d4-a716-446655440008', '2024-09-01', '2024-09-30', 1, '3a7e0102-3234-5678-8903-cdefccdefcde', 'DISKON008', '123e4567-e89b-12d3-a456-426614174201'),
        ('111e8400-e29b-41d4-a716-446655440009', '2024-10-01', '2024-12-30', 0, '4d8e0103-4234-5678-8904-ddefdddefdde', 'DISKON009', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('111e8400-e29b-41d4-a716-44665544000a', '2024-09-15', '2024-12-15', 0, '5b9e0104-5234-5678-8905-eefeeedefeef', 'DISKON010', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('111e8400-e29b-41d4-a716-44665544000b', '2024-09-01', '2024-09-30', 0, '1c3e0100-1234-5678-8901-abcdefabcdef', 'DISKON001', 'c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73'),
        ('111e8400-e29b-41d4-a716-44665544000c', '2024-09-01', '2024-10-15', 0, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'DISKON002', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('111e8400-e29b-41d4-a716-44665544000d', '2024-08-01', '2024-09-01', 1, '3a7e0102-3234-5678-8903-cdefccdefcde', 'DISKON003', '550e8400-e29b-41d4-a716-446655440012'),
        ('111e8400-e29b-41d4-a716-44665544000e', '2024-07-01', '2024-10-01', 0, '4d8e0103-4234-5678-8904-ddefdddefdde', 'DISKON004', '123e4567-e89b-12d3-a456-426614174201'),
        ('111e8400-e29b-41d4-a716-44665544000f', '2024-09-01', '2024-09-15', 2, '5b9e0104-5234-5678-8905-eefeeedefeef', 'DISKON005', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('111e8400-e29b-41d4-a716-446655440010', '2024-06-01', '2024-08-01', 1, '1c3e0100-1234-5678-8901-abcdefabcdef', 'DISKON006', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('111e8400-e29b-41d4-a716-446655440011', '2024-09-15', '2024-10-15', 0, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'DISKON007', 'c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73'),
        ('111e8400-e29b-41d4-a716-446655440012', '2024-10-01', '2024-12-01', 1, '3a7e0102-3234-5678-8903-cdefccdefcde', 'DISKON008', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65');

        INSERT INTO STATUS_PESANAN (id, Nama) VALUES
        ('a1b2c3d4-e5f6-1234-5678-9abcdef01234', 'Menunggu Pembayaran'),
        ('b2c3d4e5-f6a1-2345-6789-abcdef013456', 'Mencari Pekerja Terdekat'),
        ('c3d4e5f6-a1b2-3456-7890-bcdef0145678', 'Menunggu Pekerja Berangkat'),
        ('f6a1b2c3-d4e5-6789-0123-ef0178901234', 'Pekerja Tiba di Lokasi'),
        ('d4e5f6a1-b2c3-4567-8901-cdef01567890', 'Pelayanan Jasa Sedang Dilakukan'),
        ('e5f6a1b2-c3d4-5678-9012-def016789012', 'Pesanan Selesai'),
        ('a1b2c3d4-e5f6-7890-1234-f01890123456', 'Pesanan Dibatalkan');

        INSERT INTO TR_PEMESANAN_JASA (id, TglPemesanan, TglPekerjaan, WaktuPekerjaan, TotalBiaya, idPelanggan, idPekerja, idKategoriJasa, Sesi, idDiskon, idMetodeBayar) VALUES
        ('1f3a2b30-1234-5678-8901-abcdefabcdef', '2024-10-01', '2024-10-05', '2024-10-05 09:00:00', 150000.00, '1c3e0100-1234-5678-8901-abcdefabcdef', '6fae0105-6234-5678-8906-ffeeffefefef', 'b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 1, 'DISKON001', '550e8400-e29b-41d4-a716-446655440012'),
        ('2a4b2b31-2234-5678-8902-bcdefbcdefbc', '2024-10-02', '2024-10-06', '2024-10-06 10:00:00', 200000.00, '2f5e0101-2234-5678-8902-bcdefbcdefbc', '7ebe0106-7234-5678-8907-001100112223', 'b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 2, 'DISKON002', '123e4567-e89b-12d3-a456-426614174201'),
        ('3c5d2b32-3234-5678-8903-cdefccdefcde', '2024-10-03', '2024-10-07', '2024-10-07 08:30:00', 120000.00, '3a7e0102-3234-5678-8903-cdefccdefcde', '8ace0107-8234-5678-8908-113322114455', 'b3fbb3b6-9a9a-4a56-a7b3-19d7397d2fa5', 3, 'DISKON003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('4d6e2b33-4234-5678-8904-ddefdddefdde', '2024-10-04', '2024-10-08', '2024-10-08 11:00:00', 175000.00, '4d8e0103-4234-5678-8904-ddefdddefdde', '9bde0108-9234-5678-8909-225544226677', '2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 1, 'DISKON004', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('5e7f2b34-5234-5678-8905-eefeeedefeef', '2024-10-05', '2024-10-09', '2024-10-09 14:00:00', 300000.00, '5b9e0104-5234-5678-8905-eefeeedefeef', 'acd10109-1234-5678-8910-337766338899', '2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 2, 'DISKON005', 'c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73'),
        ('37bcc07c-6b31-4586-a85f-fdf68454618b', '2024-10-06', '2024-10-10', '2024-10-10 09:30:00', 175000.00, '1c3e0100-1234-5678-8901-abcdefabcdef', '9bde0108-9234-5678-8909-225544226677', '2d49b1fe-6b14-49d7-87e2-759ba97e1c0a', 3, 'DISKON006', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('5525a736-21c5-4fac-a240-d63b9fde1277', '2024-10-07', '2024-10-11', '2024-10-11 12:00:00', 250000.00, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'acd10109-1234-5678-8910-337766338899', 'e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 1, 'DISKON007', '550e8400-e29b-41d4-a716-446655440012'),
        ('fef1d530-473e-492b-8eab-dbe0e9689159', '2024-10-08', '2024-10-12', '2024-10-12 08:00:00', 100000.00, '3a7e0102-3234-5678-8903-cdefccdefcde', '7ebe0106-7234-5678-8907-001100112223', 'e69bf2e1-16b1-4e82-9216-9fb2a27f8f11', 2, 'DISKON008', '123e4567-e89b-12d3-a456-426614174201'),
        ('4295991e-4f6c-4385-8b41-c77938db0440', '2024-10-09', '2024-10-13', '2024-10-13 10:00:00', 180000.00, '4d8e0103-4234-5678-8904-ddefdddefdde', '6fae0105-6234-5678-8906-ffeeffefefef', 'ce3a2e4c-0fb3-4564-a0af-471e2c01a8e7', 1, 'DISKON009', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('595c63df-0649-4d69-8d17-afcad49e73f4', '2024-10-10', '2024-10-14', '2024-10-14 15:00:00', 160000.00, '5b9e0104-5234-5678-8905-eefeeedefeef', '7ebe0106-7234-5678-8907-001100112223', 'f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 3, 'DISKON010', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('06e977f8-c538-43c0-b3b5-7f55740ffa5c', '2024-10-11', '2024-10-15', '2024-10-15 11:00:00', 140000.00, '1c3e0100-1234-5678-8901-abcdefabcdef', '8ace0107-8234-5678-8908-113322114455', 'f249d4cf-7a5e-4d8e-bc50-9606dc223e71', 1, 'DISKON011', '123e4567-e89b-12d3-a456-426614174201'),
        ('87ff5d69-51bc-4196-a9d2-a4e2dbbb6a07', '2024-10-12', '2024-10-16', '2024-10-16 14:00:00', 210000.00, '2f5e0101-2234-5678-8902-bcdefbcdefbc', '9bde0108-9234-5678-8909-225544226677', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 'DISKON012', 'c21f5d64-79bc-4f2d-b4f5-e27f07c1ad73'),
        ('ef9c7b3d-e303-4ef9-816a-8117dfca2d81', '2024-10-13', '2024-10-17', '2024-10-17 13:00:00', 190000.00, '3a7e0102-3234-5678-8903-cdefccdefcde', 'acd10109-1234-5678-8910-337766338899', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 'DISKON013', '550e8400-e29b-41d4-a716-446655440012'),
        ('72240896-c82d-437d-849e-5499eed7ca0f', '2024-10-14', '2024-10-18', '2024-10-18 09:00:00', 230000.00, '4d8e0103-4234-5678-8904-ddefdddefdde', '8ace0107-8234-5678-8908-113322114455', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 1, 'DISKON014', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('4c892b95-3262-4072-aec2-beecf11b184f', '2024-10-15', '2024-10-19', '2024-10-19 12:00:00', 160000.00, '5b9e0104-5234-5678-8905-eefeeedefeef', '9bde0108-9234-5678-8909-225544226677', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 'DISKON015', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        ('228f9fec-36cf-443d-9198-c64d615976d3', '2024-10-16', '2024-10-20', '2024-10-20 10:00:00', 190000.00, '1c3e0100-1234-5678-8901-abcdefabcdef', '6fae0105-6234-5678-8906-ffeeffefefef', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 'DISKON016', '123e4567-e89b-12d3-a456-426614174201'),
        ('14a32e52-dccf-4322-ba92-052d83dfab4c', '2024-10-17', '2024-10-21', '2024-10-21 09:00:00', 240000.00, '2f5e0101-2234-5678-8902-bcdefbcdefbc', '8ace0107-8234-5678-8908-113322114455', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 1, 'DISKON017', '3e8f9b83-62b7-4031-8e53-8d93b69375d2'),
        ('1b5aef36-6f35-413c-a74b-736cce7aebdb', '2024-10-18', '2024-10-22', '2024-10-22 14:00:00', 160000.00, '3a7e0102-3234-5678-8903-cdefccdefcde', '7ebe0106-7234-5678-8907-001100112223', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 'DISKON018', '550e8400-e29b-41d4-a716-446655440012'),
        ('0551d3a4-2bdc-4090-b9be-e8f9af518c99', '2024-10-19', '2024-10-23', '2024-10-23 12:00:00', 300000.00, '4d8e0103-4234-5678-8904-ddefdddefdde', '6fae0105-6234-5678-8906-ffeeffefefef', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 'DISKON019', '123e4567-e89b-12d3-a456-426614174201'),
        ('6bdfb419-b8bc-4486-8376-e5801f6e8e33', '2024-10-20', '2024-10-24', '2024-10-24 15:00:00', 210000.00, '5b9e0104-5234-5678-8905-eefeeedefeef', '9bde0108-9234-5678-8909-225544226677', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 1, 'DISKON020', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('f769c5a1-fa8d-4b16-abd4-ecc86603382a', '2024-10-21', '2024-10-25', '2024-10-25 10:00:00', 270000.00, '1c3e0100-1234-5678-8901-abcdefabcdef', '8ace0107-8234-5678-8908-113322114455', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 'DISKON001', '550e8400-e29b-41d4-a716-446655440012'),
        ('0e176705-2b66-4d5d-8fb6-50f636ed4ddf', '2024-10-22', '2024-10-26', '2024-10-26 11:00:00', 180000.00, '2f5e0101-2234-5678-8902-bcdefbcdefbc', 'acd10109-1234-5678-8910-337766338899', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 'DISKON002', '123e4567-e89b-12d3-a456-426614174201'),
        ('0d1af6a3-124e-422b-9c51-25ec5c8810ad', '2024-10-23', '2024-10-27', '2024-10-27 12:00:00', 250000.00, '3a7e0102-3234-5678-8903-cdefccdefcde', '9bde0108-9234-5678-8909-225544226677', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 1, 'DISKON003', 'd2c3c141-0c38-4f21-a00b-8b0f58a33a65'),
        ('4a5c7157-3252-445b-a5d7-043cb4f3b009', '2024-10-24', '2024-10-28', '2024-10-28 14:00:00', 320000.00, '4d8e0103-4234-5678-8904-ddefdddefdde', '8ace0107-8234-5678-8908-113322114455', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 2, 'DISKON004', '550e8400-e29b-41d4-a716-446655440012'),
        ('a48af308-27bc-403d-88eb-ffa22158218d', '2024-10-25', '2024-10-29', '2024-10-29 09:00:00', 290000.00, '5b9e0104-5234-5678-8905-eefeeedefeef', '7ebe0106-7234-5678-8907-001100112223', 'bf98b6a7-c4b4-492d-95b6-78b76df40c29', 3, 'DISKON005', '123e4567-e89b-12d3-a456-426614174201');

        INSERT INTO TR_PEMESANAN_STATUS (IdTrPemesanan, idStatus, TglWaktu) VALUES
        ('1f3a2b30-1234-5678-8901-abcdefabcdef', 'a1b2c3d4-e5f6-1234-5678-9abcdef01234', '2024-10-11 10:00:00'),
        ('2a4b2b31-2234-5678-8902-bcdefbcdefbc', 'b2c3d4e5-f6a1-2345-6789-abcdef013456', '2024-10-11 10:05:00'),
        ('3c5d2b32-3234-5678-8903-cdefccdefcde', 'c3d4e5f6-a1b2-3456-7890-bcdef0145678', '2024-10-11 10:10:00'),
        ('4d6e2b33-4234-5678-8904-ddefdddefdde', 'd4e5f6a1-b2c3-4567-8901-cdef01567890', '2024-10-11 10:15:00'),
        ('5e7f2b34-5234-5678-8905-eefeeedefeef', 'e5f6a1b2-c3d4-5678-9012-def016789012', '2024-10-11 10:20:00'),
        ('37bcc07c-6b31-4586-a85f-fdf68454618b', 'f6a1b2c3-d4e5-6789-0123-ef0178901234', '2024-10-11 10:25:00'),
        ('5525a736-21c5-4fac-a240-d63b9fde1277', 'a1b2c3d4-e5f6-7890-1234-f01890123456', '2024-10-11 10:30:00'),
        ('fef1d530-473e-492b-8eab-dbe0e9689159', 'b2c3d4e5-f6a1-2345-6789-abcdef013456', '2024-10-11 10:35:00'),
        ('4295991e-4f6c-4385-8b41-c77938db0440', 'c3d4e5f6-a1b2-3456-7890-bcdef0145678', '2024-10-11 10:40:00'),
        ('595c63df-0649-4d69-8d17-afcad49e73f4', 'd4e5f6a1-b2c3-4567-8901-cdef01567890', '2024-10-11 10:45:00'),
        ('06e977f8-c538-43c0-b3b5-7f55740ffa5c', 'e5f6a1b2-c3d4-5678-9012-def016789012', '2024-10-11 10:50:00'),
        ('87ff5d69-51bc-4196-a9d2-a4e2dbbb6a07', 'f6a1b2c3-d4e5-6789-0123-ef0178901234', '2024-10-11 10:55:00'),
        ('ef9c7b3d-e303-4ef9-816a-8117dfca2d81', 'a1b2c3d4-e5f6-7890-1234-f01890123456', '2024-10-11 11:00:00'),
        ('72240896-c82d-437d-849e-5499eed7ca0f', 'b2c3d4e5-f6a1-2345-6789-abcdef013456', '2024-10-11 11:05:00'),
        ('4c892b95-3262-4072-aec2-beecf11b184f', 'c3d4e5f6-a1b2-3456-7890-bcdef0145678', '2024-10-11 11:10:00'),
        ('228f9fec-36cf-443d-9198-c64d615976d3', 'd4e5f6a1-b2c3-4567-8901-cdef01567890', '2024-10-11 11:15:00'),
        ('14a32e52-dccf-4322-ba92-052d83dfab4c', 'e5f6a1b2-c3d4-5678-9012-def016789012', '2024-10-11 11:20:00'),
        ('1b5aef36-6f35-413c-a74b-736cce7aebdb', 'f6a1b2c3-d4e5-6789-0123-ef0178901234', '2024-10-11 11:25:00'),
        ('0551d3a4-2bdc-4090-b9be-e8f9af518c99', 'a1b2c3d4-e5f6-7890-1234-f01890123456', '2024-10-11 11:30:00'),
        ('6bdfb419-b8bc-4486-8376-e5801f6e8e33', 'b2c3d4e5-f6a1-2345-6789-abcdef013456', '2024-10-11 11:35:00'),
        ('f769c5a1-fa8d-4b16-abd4-ecc86603382a', 'c3d4e5f6-a1b2-3456-7890-bcdef0145678', '2024-10-11 11:40:00'),
        ('0e176705-2b66-4d5d-8fb6-50f636ed4ddf', 'd4e5f6a1-b2c3-4567-8901-cdef01567890', '2024-10-11 11:45:00'),
        ('0d1af6a3-124e-422b-9c51-25ec5c8810ad', 'e5f6a1b2-c3d4-5678-9012-def016789012', '2024-10-11 11:50:00'),
        ('4a5c7157-3252-445b-a5d7-043cb4f3b009', 'f6a1b2c3-d4e5-6789-0123-ef0178901234', '2024-10-11 11:55:00'),
        ('a48af308-27bc-403d-88eb-ffa22158218d', 'a1b2c3d4-e5f6-7890-1234-f01890123456', '2024-10-11 12:00:00');

        INSERT INTO TESTIMONI (IdTrPemesanan, Tgl, Teks, Rating) VALUES
        ('1f3a2b30-1234-5678-8901-abcdefabcdef', '2024-10-06', 'Layanan sangat memuaskan! Pekerja sangat profesional.', 5),
        ('2a4b2b31-2234-5678-8902-bcdefbcdefbc', '2024-10-07', 'Sangat cepat dan efisien. Hasilnya memuaskan!', 4),
        ('3c5d2b32-3234-5678-8903-cdefccdefcde', '2024-10-08', 'Pengalaman yang luar biasa, akan menggunakan lagi.', 5),
        ('4d6e2b33-4234-5678-8904-ddefdddefdde', '2024-10-09', 'Rasa kecewa, ada beberapa masalah kecil.', 3),
        ('5e7f2b34-5234-5678-8905-eefeeedefeef', '2024-10-10', 'Cukup baik, tapi masih bisa diperbaiki.', 4),
        ('37bcc07c-6b31-4586-a85f-fdf68454618b', '2024-10-11', 'Layanan tidak sesuai harapan. Sangat lambat.', 2),
        ('5525a736-21c5-4fac-a240-d63b9fde1277', '2024-10-12', 'Pekerja sangat ramah dan membantu. Terima kasih!', 5),
        ('fef1d530-473e-492b-8eab-dbe0e9689159', '2024-10-13', 'Sangat profesional dan bertanggung jawab.', 5),
        ('4295991e-4f6c-4385-8b41-c77938db0440', '2024-10-14', 'Pekerjaan bagus, tapi harga sedikit mahal.', 4),
        ('595c63df-0649-4d69-8d17-afcad49e73f4', '2024-10-15', 'Ragu untuk merekomendasikan, tidak puas.', 2),
        ('06e977f8-c538-43c0-b3b5-7f55740ffa5c', '2024-10-16', 'Bagus, tapi ada waktu tunggu yang cukup lama.', 3),
        ('87ff5d69-51bc-4196-a9d2-a4e2dbbb6a07', '2024-10-17', 'Sangat baik! Memuaskan sekali.', 5),
        ('ef9c7b3d-e303-4ef9-816a-8117dfca2d81', '2024-10-18', 'Pengalaman buruk, tidak akan kembali lagi.', 1),
        ('72240896-c82d-437d-849e-5499eed7ca0f', '2024-10-19', 'Rasa puas dengan hasil akhirnya.', 4),
        ('4c892b95-3262-4072-aec2-beecf11b184f', '2024-10-20', 'Pengalaman tidak menyenangkan. Ada kesalahan.', 2),
        ('228f9fec-36cf-443d-9198-c64d615976d3', '2024-10-21', 'Pekerja sangat terampil, hasil memuaskan.', 5),
        ('14a32e52-dccf-4322-ba92-052d83dfab4c', '2024-10-22', 'Menyesal menggunakan layanan ini, tidak sesuai.', 1);    
    `);

    console.log('Seeding database done!');
}

export async function seedTrigger() {
    await pool.query(`
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

    `);

    console.log('Seeding trigger done!');
}

async function seedDatabaseRun() {
    await resetDatabase();
    await createTable();
    await seedDatabase();
    await seedTrigger();
}


seedDatabaseRun()