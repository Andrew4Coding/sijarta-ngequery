export const RegisterPage = () => {
    return (
        <main className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl">Register to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form className="w-full mt-5 flex flex-col gap-4 min-w-[400px]">
                    <div>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" id="nama" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama" />
                    </div>
                    <div>
                        <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                        <select id="jenisKelamin" className="w-full border border-gray-300 p-2 rounded-md mb-2">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="noHp">No HP</label>
                        <input type="text" id="noHp" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No HP" />
                    </div>
                    <div>
                        <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                        <input type="date" id="tanggalLahir" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Tanggal Lahir" />
                    </div>
                    <div>
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" id="alamat" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Alamat" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Confirm Password" />
                    </div>
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
                </form>
                <p>Sudah punya akun <a href="/login" className="font-bold">Login</a></p>
            </div>
        </main>
    );
}