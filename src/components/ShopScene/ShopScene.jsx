import React, {useState} from 'react'

import Button from '../Button'


function ShopScene({wallet, setWallet, itemInventory, setItemInventory, equipInventory, setEquipInventory}) {
const [buy, setBuy] = useState(false)
const [sell, setSell] = useState(false)
const [shopText, setShopText] = useState('What will you be doing today?')
let amount = 100


const clickHandler = (type) => {
  if(type === 'Buy'){
    setBuy(prevBuy => !prevBuy)
    console.log('Go Ahead TACCOM.')
    setShopText('What would you like to buy?')

  }else if(type === 'Sell'){
    setSell(prevSell => !prevSell)
    console.log('Confirmed.')
    setShopText('What would you like to sell?')

  } else if(type === 'Items') {
    if(wallet === 0) {
      console.log('You have no money!')
      setShopText('You have no money!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)

    }else {
      console.log('You bought an Item.')
      setShopText('Thank You!')
      setWallet(wallet -= amount)
      setItemInventory(itemInventory += 1)
      setTimeout(() => setShopText('What would you like to buy?'), 2000)
    }

  }else if(type === 'Equip') {
    if(wallet === 0){
      console.log('You have no money!')
      setShopText('You have no money!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)
      
    }else{
      console.log('You bought some equipment.')
      setShopText('Thank You!')
      setWallet(wallet -= amount)
      setEquipInventory(equipInventory += 1)
      setTimeout(() => setShopText('What would you like to buy?'), 2000)

    }
  

  }else if(type === 'S-Items') {
    if(itemInventory === 0){
      console.log("You have nothing to sell!")
      setShopText('You have nothing to sell!')
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
      
    }else {
      console.log('You sold an item.')
      setShopText('Pleasure doing business with you!')
      setWallet(wallet += amount)
      setItemInventory(itemInventory -= 1)
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
    }
  
  
  }else if(type === 'S-Equip') {
    if(equipInventory === 0){
      console.log("You have nothing to sell!")
      setShopText('You have nothing to sell!')
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
     
    }else {
      console.log('You sold some equipment.')
      setShopText('Pleasure doing business with you!')
      setWallet(wallet += amount)
      setEquipInventory(equipInventory -= 1)
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
    }
   
  
  }else if(type === 'Close' && buy === true) {
    setBuy(prevBuy => !prevBuy)
    setShopText('What will you be doing today?')
    
  
  }else if(type === 'Close' && sell === true) {
    setSell(prevSell => !prevSell)
    setShopText('What will you be doing today?')
    
  
  }

}


  return (
    <div className='shop-scene'>
      <p>Welcome to our Shop!</p>
      <p>{wallet} Xal</p>
      <p>{itemInventory} items in possession.</p>
      <p>{equipInventory} equipment in possession.</p>
      <div>
        {shopText} 
        <br/>
        
        {!buy && !sell  && <Button onClick={() => clickHandler('Buy')} type='buy' />}
        { buy  && <Button onClick={() => clickHandler('Items')} type={'Items'}/>} 
        { buy  && <Button onClick={() => clickHandler('Equip')} type={'Equip'}/>} 
        { buy  && <Button onClick={() => clickHandler('Close')} type={'Close'}/>} 
        {!sell && !buy && <Button onClick={() => clickHandler('Sell')} type={'sell'} />}
        { sell && <Button onClick={() => clickHandler('S-Items')} type={'S-Items'}/>} 
        { sell && <Button onClick={() => clickHandler('S-Equip')} type={'S-Equip'}/>} 
        { sell && <Button onClick={() => clickHandler('Close')} type={'Close'}/>} 
      </div>

    </div>
  )
}

export default ShopScene