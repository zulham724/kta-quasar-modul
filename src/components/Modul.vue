<template>
    <div>
        <div 
            class="col-4" 
            clickable
            @click="$router.push('/modul')"
        >
            <q-card class="my-card q-ma-sm text-white text-bold">
                <q-img src="~assets/contoh-modul-sma.png"></q-img>
            </q-card>
        </div> 
    </div>
</template>

<script>
export default {
    
}
</script>