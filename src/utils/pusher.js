import ClientPusher from "pusher-js"
import  sponser1  from '../img/sponser1.jpg'
import  sponser2  from '../img/sponser2.jpg'
import  sponser3  from '../img/sponser3.jpg'
import  sponser4  from '../img/sponser4.jpg'
import  sponser6  from '../img/sponser6.jpg'
import  sponser7  from '../img/sponser7.jpg'
import  sponser8  from '../img/sponser8.jpg'
import  lambo from '../img/Lamborghini.png'
import  ie from '../img/ie.png'
import  ryzer from '../img/ryzer.png'
import  apple from '../img/apple.png'
import  redbull from '../img/redbull.png'
import  str from '../img/str.png'

export const clientpusher = new ClientPusher('8d31c6dabbcf90f8b394', {
    cluster: 'ap1',
    forceTLS: true
})


export const sponser = [
  {
    src: sponser1,     
    company: 'Apolo ie',
    description: 'Apollo Intensa Emozione Engine	6.3 L naturally-aspirated V12',
    link:'https://www.apollofmg.com/en/automobil/',
    compantlogoL:ie
    
  },
  {
    src: sponser2,     
    company: 'Ryzer',
    description: 'Best Gaming laptop 2022',
    link:'https://www.razer.com/',
    compantlogoL:ryzer
  },
  {
    src: sponser3,     
    company: 'Apple',
    description: ' i Phone 14 have Dynamic Island',
    link:'https://www.apple.com/',
    compantlogoL:apple
  },
  {
    src: sponser4,     
    company: 'Lomborghin',
    description: 'Ultra-rare Lamborghini Veneno ',
    link:'https://www.lamborghini.com/en-en',
    compantlogoL:lambo
  },
  {
    src: sponser6,     
    company: 'Redbull',
    description: 'Energy drink',
    link:'https://www.redbull.com/',
    compantlogoL:redbull
  },
  {
    src: sponser7,     
    company: 'Starbucks',
    description: 'For Coffee Lover',
    link:'https://www.starbucks.com/',
    compantlogoL:str
  },
  {
    src: sponser8,     
    company: 'Apolo ie',
    description: 'performent is key',
    link:'https://www.apollofmg.com/en/automobil/',
    compantlogoL:ie
  },
]