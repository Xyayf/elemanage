import request from '@/until/request.js'
/**
 * 上传文件
 * @param {string} url 
 * @param {binary} file 
 * @param {Function} progorss 
 */
const Upload =( url,file,progorss)=>{
    const formData = new FormData()
    formData.append('file', file)
   
    return request({
         url:'http://127.0.0.1:8001'+url,
         method:'post',
         data:formData,
        //  Headers:{
        //    'Content-Type': 'multipart/form-data'
        //  },
         onUploadProgress:function(event){
             console.log(event)
             if(event.lengthComputable){
                 progorss(event.total,event)
             }
         }
         
     })
   }
export default Upload