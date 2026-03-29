import { useState } from 'react'
import ContactLayout from './ContactLayout'

export default function ContactRoom() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 1500)
  }

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('uijung4@gmail.com')
      showMessage('이메일이 복사되었습니다.')
    } catch {
      showMessage('복사에 실패했습니다.')
    }
  }

  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText('010-7615-6997')
      showMessage('전화번호가 복사되었습니다.')
    } catch {
      showMessage('복사에 실패했습니다.')
    }
  }

  return (
    <ContactLayout
      showToast={showToast}
      toastMessage={toastMessage}
      onEmailClick={handleEmailClick}
      onPhoneClick={handlePhoneClick}
    />
  )
}