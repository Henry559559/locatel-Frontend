import Layout from '../../hocs/Layout'
import { Navigate } from 'react-router'
import { connect } from 'react-redux'
import CartItem from '../../components/cart/CartItem'
import { setAlert } from '../../redux/actions/alert'
import { update_item, remove_item } from '../../redux/actions/cart'
import { useEffect, useState } from 'react'

import {
  refreshToken
} from '../../redux/actions/auth';




const Checkout = ({
    isAuthenticated, 
    items,
    update_item,
    remove_item,
    setAlert,
    refreshToken,
    user,
    total_items,
    clientToken,
    loading,
    original_price,
    total_amount,
    total_compare_amount,
    estimated_tax
}) => {

    
    

    useEffect(() => {
      window.scrollTo(0,0)
      
  }, [])

 
  

    const [render, setRender] = useState(false);

    if(!isAuthenticated)
        return <Navigate to='/' />;

    const showItems = () => {
        return(
            <div>
                {
                    items && 
                    items !== null && 
                    items !== undefined && 
                    items.length !== 0 && 
                    items.map((item, index)=>{
                        let count = item.count;
                        return (
                            <div key={index}>
                                <CartItem 
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                    setAlert={setAlert}
                                />
                            </div>
                        );
                    })
                }
            </div>
        )
    }


    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                        </h2>

                        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {showItems()}
                        </ul>
                    </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    items: state.Cart.items,
    total_items: state.Cart.total_items,
})

export default connect(mapStateToProps,{
    update_item,
    remove_item,
    setAlert,
    refreshToken,
}) (Checkout)