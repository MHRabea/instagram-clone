/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./public/**/*.{js,jsx,ts,tsx}",
];
// module.exports = {
//   future:{
//     removeDeprecatedGapUtilities:true
//   },
//   theme :{
//     fill : (theme) =>({
//       red:theme('color.red.primary')
//     })
//   }
// }
export const theme = {
  extend: {
    fill: (theme) =>({
      red:theme("colors.red.primary")
    }),
    animation:{
      ping : 'ping 1s cubic-bezier(0,0,0.2,1) '
      ,pingp: 'ping 0.5s cubic-bezier(.17 , .89 , .32 , 1.49)'
    },
    keyframes:{
      ping:{
        "0% , 100%":{
          "font-size" : "0",
          "scale": "0"
        },
        "50%":{
          "font-size" : "1",
          "scale": "1"
        }
        
      },
      pingp:{
        '0% , 100%':{
          "font-size":"0",
          "scale":"0"
        },
        '50%':{
          "font-size":"1",
          "scale":"1"
        }
      }
    }
  },
};
export const plugins = [];

