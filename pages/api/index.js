
const express= require('express')
const router = express.Router()
const needle=require('needle')

//Environment vars
const API_PUBLIC_FIREBASE_API_KEY=process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const API_PUBLIC_MAPBOX_key=process.env.NEXT_PUBLIC_MAPBOX_key;
const API_PUBLIC_FIREBASE_appID=process.env.NEXT_PUBLIC_FIREBASE_appID;
const API_PUBLIC_FIREBASE_measurementID=process.env.NEXT_PUBLIC_FIREBASE_measurementID;
const API_PUBLIC_FIREBASE_messagerID=process.env.NEXT_PUBLIC_FIREBASE_messagerID;
const API_PUBLIC_GOOGLEMAPS_API_KEY=process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
const API_PUBLIC_PAYPAL_CLIENTID_KEY=process.env.NEXT_PUBLIC_PAYPAL_CLIENTID_KEY;
const API_MESSAGING_VAPID_KEY=process.env.FIREBASE_MESSAGING_VAPID_KEY;

router.get('/',async(req,res)=>{
    try {
        const apiRes= await needle('get',`${API_PUBLIC_MAPBOX_key}`)
    const data=apiRes.body
    res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error})
        
    }
    
})

module.exports=router