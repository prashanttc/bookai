'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Button onClick={()=>signIn()}>sign in</Button>
    </div>
  )
}

export default Page
