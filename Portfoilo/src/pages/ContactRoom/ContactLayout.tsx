import table_BG from '../../assets/images/table_BG.png'
import contact_board from '../../assets/icons/contact_board.svg'
import post_email from '../../assets/icons/post_it_email.svg'
import post_phone from '../../assets/icons/post_it_phone.svg'
import BackButton from '../../components/atoms/BackButton'
import Img from '../../components/organisims/DynamicImg'

type ContactLayoutProps = {
  showToast: boolean
  toastMessage: string
  onEmailClick: () => void
  onPhoneClick: () => void
}

export default function ContactLayout({
  showToast,
  toastMessage,
  onEmailClick,
  onPhoneClick,
}: ContactLayoutProps) {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <img
          src={table_BG}
          alt="table background"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        />

        <img
          src={contact_board}
          alt="contact board"
          className="fixed top-[2.5%] left-0 w-full h-[95%] object-contain"
        />

        <Img
          src={post_email}
          alt="email sticky"
          className="absolute top-[25%] left-[80%] w-[15%]"
          onClick={onEmailClick}
          Effect={['shake']}
        />

        <Img
          src={post_phone}
          alt="phone sticky"
          className="absolute top-[60%] left-[80%] w-[15%] h-auto"
          onClick={onPhoneClick}
          Effect={['shake']}
        />

        <BackButton />

        {/* Toast 메시지 */}
        {showToast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </>
  )
}