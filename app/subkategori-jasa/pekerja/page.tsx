import React, { Suspense } from 'react'
import { SubKategoriJasaPekerja } from '@/modules/SubKategoriJasaPekerja'

const page = () => {
  return (
    <Suspense
      fallback={<div>Loading...</div>}
    >
      <SubKategoriJasaPekerja />
    </Suspense>
  )
}

export default page