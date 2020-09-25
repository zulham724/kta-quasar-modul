<template>
<div>
    <q-item class="q-pa-sm" style="background-color:white;
      border-radius:10px">
        <q-item-section avatar top style="padding-right:10px" clickable @click="$router.push('/modul')">
            <q-avatar square size="25vw">
                <img src="~assets/modul.png" style="width:80%; transform: scale(1,1)" />
            </q-avatar>
        </q-item-section>
        <q-item-section top>
            <q-item-label>
                <div class="text-weight-bold">{{module.subject}}</div>
            </q-item-label>
            <q-item-label>
                <div class="text-weight-medium" style="font-size:14px">{{module.grade.description}}</div>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
            <q-btn color="grey-7" round flat icon="more_horiz">
                <q-menu anchor="top right" self="top left" auto-close transition-show="scale" transition-hide="scale">
                    <q-list>
                        <q-item class="q-py-none" clickable style="background-color:#E0E0E0">
                            <q-item-section @click="$router.push('/edit/'+module.id)">
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        edit
                                    </span>
                                    Sunting
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item clickable class="q-py-none" style="border-top:1px solid grey;
                  background-color:#E0E0E0">
                            <q-item-section>
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        delete
                                    </span>
                                    Buang
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item clickable class="q-py-none" style="border-top:1px solid grey;
                background-color:#E0E0E0">
                            <q-item-section>
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        save_alt
                                    </span>
                                    Publish
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-item-section>
    </q-item>
</div>
</template>

<script>
export default {
    props: {
        module: null
    },
    data() {
        return {
            tab: "modul"
        };
    }
}
</script>
