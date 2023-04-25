import Back from "@/components/back";
import { CheckIcon, MealIcon, MenuIcon, RemoveIcon } from "@/components/icons";
import { useIdStore, useUserStore } from "@/state/user";
import React, { useRef, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import emptyAnimation from "@assets/empty.json";
import cx from "classnames";
import LottieFile from "@/components/lottie";
import { useLocation, useNavigate } from "react-router-dom";
import { BiMessageAltAdd, BiMessageAltDetail } from "react-icons/bi";
import { useDataStore } from "@/state/data";
const tva = 0
const CartView = () => {
const {restoId,tableId}=useDataStore()
const id=useIdStore(state=>state.id)
  const { cart: items, removeFromCart, total,sendOrder } = useUserStore()
  const [animationRef] = useAutoAnimate()

  const location = useLocation()
  const nav = useNavigate()
  const goToMenu = () => {
    nav(location.pathname.replaceAll('cart', 'menu'))
  }
  const onValidate = () => {
    if(restoId&&tableId)
    sendOrder(id,restoId,tableId.toString())
  }
  return <>
    <div className="bg-accent p-content h-screen w-screen space-y-10">
      <div className="flex flex-row justify-between items-center">

        <Back />
        {items.length > 0 && <AddNote />}
      </div>

      <h6 className="text-xl font-semibold text-text">
        Mes Commandes
      </h6>
      <div ref={animationRef} className="flex flex-col items-stretch gap-10 ">
        {items.length === 0 && <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-[70vw]">
            <LottieFile animationData={emptyAnimation} />
          </div>
          <div className="-translate-y-[50px] flex flex-col gap-3">
            <h6 className="text-text font-semibold text-xl">
              Votre panier est vide
            </h6>
            <span className="text-text/50">
              Ajoutez des produits pour continuer
            </span>
            <button
              onClick={
                goToMenu
              }
              className="btn btn-primary rounded-full px-2 gap-3 ">
              <MealIcon className="text-lg" />
              Menu
            </button>
          </div>

        </div>
        }
        {
          items.map((item, i) => {
            return <div key={i} className="flex flex-row  gap-3 items-center">
              <div className="w-16 h-16 rounded-2xl relative overflow-hidden">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="h-full flex flex-col justify-around flex-grow gap-2">
                <h6 className="text-text font-semibold">
                  {item.product.name}
                </h6>
                <span className="">
                  {item.quantity} x {item.product.price + item.extra.reduce((acc, item) => acc + item.price, 0)} = <span className="text-green-500 font-semibold">{item.quantity * (item.product.price + item.extra.reduce((acc, item) => acc + item.price, 0))} MAD</span>
                </span>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="btn btn-ghost btn-sm">
                <RemoveIcon className="text-lg text-red-500" />
              </button>
            </div>
          })

        }

      </div>
    </div>
    <div className={cx("fixed bottom-0 left-0 w-full bg-white rounded-tr-2xl rounded-tl-2xl p-content", {
      "hidden": items.length === 0
    })}>
      <div className="flex flex-row items-center w-full justify-between">
        <h6 className=""> TVA</h6>
        <span>
          {tva * 100}%
        </span>
      </div>
      <div className="flex flex-row items-center w-full text-xl font-semibold justify-between text-text">
        <h6>
          Total
        </h6>
        <span>
          {total * (1 + tva)} MAD
        </span>
      </div>

      <div className="w-full flex justify-center items-center">
        <button
        onClick={onValidate}
        className={cx("btn btn-primary mx-auto rounded-full px-10 gap-3"
        )}>
          <CheckIcon className="text-lg" />
          Valider
        </button>
      </div>
    </div>
  </>;
};

export default CartView;


const AddNote = () => {
  const ref = useRef<HTMLLabelElement>(null)
  const { setNote: addNote, note: n, removeNote } = useUserStore()
  const [note, setNote] = useState(n)
  const onClose = () => {
    removeNote()
    setNote("")
    ref.current?.click()

  }
  return <>

    <label ref={ref} htmlFor="note" className="btn btn-ghost bg-white">
     {note?<BiMessageAltDetail className="text-xl text-text"/>: <BiMessageAltAdd className="text-xl text-text" />}
    </label>
    {/* Put this part before </body> tag */}
    <input type="checkbox" id="note" className="modal-toggle" />
    <label htmlFor="note" className="modal cursor-pointer  text-text">
      <label className="modal-box relative space-y-4" htmlFor="">
        <h6 className=" font-bold ">Ajouter une note pour votre commande</h6>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={6} className="textarea textarea-accent w-full" placeholder="Saisir votre message"></textarea>
        <div className="modal-action justify-between">
          <button disabled={!note} onClick={onClose} className="btn btn-ghost btn-sm">Retirer</button>
          <button onClick={() => {
            addNote(note)
            ref.current?.click()
          }} className="btn btn-primary btn-sm">Enregistrer</button>
        </div>
      </label>

    </label>
  </>

}