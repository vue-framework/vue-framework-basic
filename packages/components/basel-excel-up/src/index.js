 export default function (title, down, up) {
   const h = this.$createElement
   this.$msgbox({
     title: title,
     showConfirmButton: false,
     message: h('bas-excel-temp', {
       props: {
         down: down,
         up: Object.assign(up)
       }
     })
   })
 }
