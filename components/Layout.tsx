import { FC, Fragment, ReactNode, useState } from "react"
import ConnectModal from "./connectModal"
import Footer from "./Footer"
import Header from "./Header"

interface Props {
    children: ReactNode
}

const Layout:FC<Props> = ({children}) => {

  const [openWalletModal, setOpenWalletModal] = useState(false)
  return (
    <Fragment>
        <Header openWalletModal = {() => setOpenWalletModal(true)}/>
            {children}
        <Footer/>

        <ConnectModal
          open = {openWalletModal}
          onClose = {() => setOpenWalletModal(false)}
          label = {"connect wallet modal"}
        />
    </Fragment>
  )
}

export default Layout