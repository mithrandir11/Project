
<script setup>
const {data:addresses, refresh} = await useFetch('/api/profile/addresses', {
    headers: useRequestHeaders('cookie')
})

// console.log(addresses.value)
</script>
<template>
    <div  class="w-full" >
       <ProfileAddressCreate :refresh="refresh"/>

       <div  class=" divide-y ">
            <div v-for="address in addresses" :key="address.id" class="flex flex-wrap gap-x-6 items-center  py-3 ">

                <div>
                    <img class="h-28 lg:h-32 rounded-lg" src="/images/map.png" alt="">
                </div>

                <div class="text-sm lg:text-base ">
                    <p>گیرنده : {{address.recipient_name}}</p>
                    <p>شماره تماس : {{address.cellphone}}</p>
                    <p>کدپستی : {{address.postal_code}}</p>
                    <p>آدرس : <span>{{address.full_address}}</span></p>
                </div>

                <div class="flex gap-x-3 mr-auto">
                    <ProfileAddressEdit :address="address" :refresh="refresh"/>
                    <ProfileAddressDelete :address_id="address.id" :refresh="refresh"/>
                </div>

                
                
            </div>
            
        </div>

        

    </div>
</template>