

import './Footer.scss';

const Footer = () => {

  // const [ userLogger, setUserLogger]= useState(false);
  
  const networks =[
    {
      "name": "Facebook",
      "url": "https://facebook.com",
      "image": "https://img1.freepng.es/20180319/iyw/kisspng-facebook-logo-social-media-computer-icons-icon-facebook-drawing-5ab02fb69f99c4.9538101315214959906537.jpg",
      },
    {
      "name": "Whatsapp",
      "url": "https://www.whatsapp.com/?lang=es",
      "image": "http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png ",
      },
    {
      "name": "Twiter",
      "url": "https://twitter.com/?lang=es",
      "image": "http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png",
    },
    {
      "name": "Instagram",
      "url": "https://www.instagram.com/",
      "image": "https://forcaem.com/wp-content/uploads/2016/05/instagram-png-instagram-png-logo-1455.png",
      
    }
  ];

  // useEffect(()=>{
  //   if (user){
  //     setUserLogger(true)
  //   }
    
  //  },[user])
   
  return (
    <>
      <div class="footer">
          {networks.length > 0 ? 
          (networks.map((network) => {
            return (
              <div key={JSON.stringify(network)} >
                  <img src={network.image} alt={network.name} class="footer__image" />            
              </div>
            );
          })):''}
    </div>
    </>
  );
};

export default Footer