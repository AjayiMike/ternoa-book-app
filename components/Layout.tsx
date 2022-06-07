import { FC, Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { AppContext } from "../contexts/appContext"
import ConnectModal from "./connectModal"
import DeleteModal from "./DeleteModal"
import Footer from "./Footer"
import Header from "./Header"

interface Props {
    children: ReactNode
}

const Layout:FC<Props> = ({children}) => {

  const [openWalletModal, setOpenWalletModal] = useState(false)

  const {seletedBookId, selectBook} = useContext(AppContext)
  

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

        <DeleteModal 
          open = {!!seletedBookId}
          onClose = {() => selectBook(null)}
          label = {"delete confirmation"}
        />
    </Fragment>
  )
}

export default Layout