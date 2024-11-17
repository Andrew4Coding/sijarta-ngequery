import React, { Suspense } from 'react'
import { SubKategoriJasaPengguna } from '@/modules/SubKategoriJasaPengguna'

const page = () => {
  return (
    <Suspense
      fallback={<div>Loading...</div>}
    >
      <SubKategoriJasaPengguna />
    </Suspense>
  )
}

export default page