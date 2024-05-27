export default function Main(){
    return(
        <section className="bg-gray-800 text-white">
  <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="max-w">
      <h2 className="text-3xl font-bold sm:text-4xl">Tentang Aplikasi Ini</h2>

      <p className="mt-4 text-gray-300">
      Aplikasi ini adalah sebuah sistem yang membantu Anda atau perusahaan Anda dalam 
      mengelola barang atau aset. Fungsi utamanya adalah untuk memastikan bahwa Anda selalu mengetahui
      berapa banyak barang yang Anda miliki, di mana letaknya, dan kondisinya. 
      Dengan menggunakan aplikasi ini, Anda bisa menghindari kekurangan barang tiba-tiba atau 
      penumpukan barang yang tidak perlu.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
           <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Penggunaan Mudah</h2>

          <p className="mt-1 text-sm text-gray-300">
          Aplikasi ini dirancang agar mudah digunakan. Misalnya, jika Anda mengalami 
          kesulitan atau ada kesalahan saat menghapus atau mengupdate barang, aplikasi 
          akan memberitahu Anda apa yang salah melalui notifikasi yang jelas dan informatif.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
           <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Menambah dan Mengupdate Barang</h2>

          <p className="mt-1 text-sm text-gray-300">
          Jika ada barang baru, Anda bisa dengan mudah menambahkannya ke dalam sistem melalui halaman
           khusus. Jika perlu memperbarui informasi tentang barang yang sudah ada, seperti 
            nama atau jumlahnya, Anda juga bisa melakukan itu.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
           <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Menghapus Barang</h2>

          <p className="mt-1 text-sm text-gray-300">
          Jika barang sudah tidak diperlukan atau rusak, Anda dapat menghapusnya dari sistem untuk
           memastikan bahwa daftar inventaris Anda selalu akurat.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
           <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Melihat Daftar Barang</h2>

          <p className="mt-1 text-sm text-gray-300">
          Anda bisa melihat semua barang yang tersedia dalam inventaris Anda, lengkap dengan detail 
          seperti nama barang, kategori, dan jumlah stok. Ini seperti memiliki daftar belanja yang 
          selalu terupdate otomatis.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
           <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Efisiensi</h2>

          <p className="mt-1 text-sm text-gray-300">
          Mengurangi waktu yang Anda butuhkan untuk memeriksa dan mengelola stok.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
        <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        </span>

        <div>
          <h2 className="text-lg font-bold">Penghematan</h2>

          <p className="mt-1 text-sm text-gray-300">
          Membantu Anda menghindari pembelian berlebih atau kekurangan barang, yang bisa menghemat uang.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}