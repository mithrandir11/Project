export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count(state){
            return state.cart.length
        },
        
        allItems(state){
            return state.cart
        },

        qtyOfItem(state){
            return (itemId) => state.cart.find((item) => item.id === itemId)?.qty || 0
        },

        totalAmount(state){
            return state.cart.reduce((total, product) => {
                return total + (product.price * product.qty)    
            }, 0)
        }
    },

    actions: {
        addToCart(product){
            const existingProduct = this.cart.find(item => item.id === product.id);

            if (existingProduct) {
                if(existingProduct.qty < existingProduct.quantity){
                    existingProduct.qty++;
                    push.success('تعداد محصول افزایش یافت');
                }else{
                    push.warning('موجودی انبار کافی نمیباشد');
                }
                
            } else {
                this.cart.push({
                    ...product,
                    qty: 1,
                });
                push.success('محصول به سبد خرید اضافه شد');
            }

            // console.log(this.cart)
        },

        removeFromCart(productId) {
            const productIndex = this.cart.findIndex(item => item.id === productId);
      
            if (productIndex !== -1) {
              const product = this.cart[productIndex];
      
              if (product.qty > 1) {
                product.qty--;
                push.success('تعداد محصول کاهش یافت');
              } else {
                this.cart.splice(productIndex, 1);
                push.success('محصول از سبد خرید حذف شد');
              }
            }

            console.log(this.cart)
        },

        clear() {
            this.cart = [];
        }

        // remove(id){
        //     this.cart = this.cart.filter(p => p.id != id)
        // }
    },

    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
        key: 'shopping-cart'
    },
})