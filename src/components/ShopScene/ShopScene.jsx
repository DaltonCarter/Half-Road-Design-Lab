import React, {useState, useContext} from 'react'
import InventoryContext from '../Store/InventoryContext'

import Button from '../Button'


function ShopScene({displayShop}) {
const [buy, setBuy] = useState(false)
const [sell, setSell] = useState(false)
const [shopText, setShopText] = useState('What will you be doing today?')

const inventory = useContext(InventoryContext)

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
    if(inventory.wallet === 0) {
      console.log('You have no money!')
      // setShopText('You have no money!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)

    }else {
      console.log('You bought an Item.')
      // setShopText('Thank You!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)
    }

  }else if(type === 'Equip') {
    if(inventory.wallet === 0){
      console.log('You have no money!')
      // setShopText('You have no money!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)
      
    }else{
      console.log('You bought some equipment.')
      // setShopText('Thank You!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to buy?'), 2000)

    }
  

  }else if(type === 'S-Items') {
    if(inventory.playerItems === []){
      console.log("You have nothing to sell!")
      // setShopText('You have nothing to sell!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
      
    }else {
      console.log('You sold an item.')
      // setShopText('Pleasure doing business with you!')
      setShopText('Coming Soon!!')
     
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
    }
  
  
  }else if(type === 'S-Equip') {
    if(inventory.playerEquipment === []){
      console.log("You have nothing to sell!")
      // setShopText('You have nothing to sell!')
      setShopText('Coming Soon!!')
      setTimeout(() => setShopText('What would you like to sell?'), 2000)
     
    }else {
      console.log('You sold some equipment.')
      // setShopText('Pleasure doing business with you!')
      setShopText('Coming Soon!!')
     
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

      <div>
        {shopText} 
        <br/>
        Your Funds: {inventory.wallet} Xal
        <br/>
        
        {!buy && !sell  && <Button onClick={() => clickHandler('Buy')} type='buy' />}
        { buy  && <Button onClick={() => clickHandler('Items')} type={'Items'}/>} 
        { buy  && <Button onClick={() => clickHandler('Equip')} type={'Equip'}/>} 
        { buy  && <Button onClick={() => clickHandler('Close')} type={'Close'}/>} 
        {!sell && !buy && <Button onClick={() => clickHandler('Sell')} type={'sell'} />}
        { sell && <Button onClick={() => clickHandler('S-Items')} type={'S-Items'}/>} 
        { sell && <Button onClick={() => clickHandler('S-Equip')} type={'S-Equip'}/>} 
        { sell && <Button onClick={() => clickHandler('Close')} type={'Close'}/>}
        {!buy && !sell  && <Button onClick={() => displayShop()} type={'Close'}/> }
      </div>

    </div>
  )
}

export default ShopScene