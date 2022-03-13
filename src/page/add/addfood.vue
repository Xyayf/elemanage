<template>
 <div>
<input type="file" @change="uploadFile" ref="input">
<button @click="click">tijiap</button>
 </div>

</template>

<script>
import Upload from '@/until/upload.js'
export default {
  data () {
    return {

    }
  },
  methods: {
    async  uploadFile (e) {
      console.log(e.target.files[0])
      try {
        const res = await Upload('/v1/addimg/shop', e.target.files[0], function (total, load) {
          console.log(total.load)
        })
        console.log(res)
      } catch (err) {
        alert(err)
      }
    },
    click () {
      this.$refs.input.click()
    }
  }
}
</script>
