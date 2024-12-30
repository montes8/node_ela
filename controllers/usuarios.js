const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const errorBody = {
    'success': false,
    'error': {
      'errorCode': 15,
      'errorMessage': 'ocurrio un error inesperado',
      'errorMessageDetail': 'ocurrio un error inesperado'
    }
  }

const testMovie =  { 
          "idMovie": "EOBE_uBSGYw", 
          "title": "Los Ángeles Azules, NICKI NICOLE - Otra Noche", 
          "description" : "LosAngelesAzules y NickiNicole nos presentan su último sencillo #OtraNoche donde demuestran una vez más ser la esencia de la cumbia y música latinoamericana."
      }

const testRecipes =  [
    {
      "id": 1,
      "title": "Receta de Tallarines Verdes",
      "description": "Aunque los tallarines son muy variados, los tallarines verdes son un clásico que no puede faltar en ninguna cocina peruana. Además de ser nutritivos, la combinación de los ingredientes para tallarines verdes consigue un sabor que vas a querer probar una y otra vez. Si quieres aprender a prepararlos por tu cuenta, te traemos una receta de tallarines verdes sencilla y rápida que no da lugar para el error.",
      "preparation": "Lo primero es cocer la pasta, puedes utilizar medio kilo de fideos canuto o espagueti grueso, en abundante agua, con un chorrito de aceite y sal al gusto. El tiempo de cocción debe ser el indicado en el empaque. Mientras tanto, en una sartén pon a calentar el aceite de oliva con una cebolla roja picada muy finamente hasta que se tornen transparentes. Luego, agrega el comino y los ajos. Es momento de agregar las espinacas junto a la albahaca, ambas licuadas con sal y pimienta al gusto. Debes freír hasta que se consuma totalmente el agua y déjalo entibiar. Ahora, coloca en la licuadora la mezcla que acabas de hacer junto a las nueces, la leche, el queso y sal al gusto. La salsa no debe quedar muy seca, por lo que puedes añadir más leche o agua de ser necesario. Finalmente, agrega la salsa a la pasta y es momento de servir. Cuando este listo servimos en un plato mezclando nuestra salsa verde con los fideos, añadimos un poco de queso parmesano al gusto.",
      "urlImg": "https://www.comidastipicasperuanas.com/wp-content/uploads/2022/03/Receta-de-tallarines-verdes-Comidas-Peruanas.jpg",
      "institute": "Establecimiento 01",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.99405732",
      "longitude": "-77.06241231"
    },
    {
      "id": 2,
      "title": "Cabrito a la Norteña",
      "description": "El Seco de Cabrito Norteño es uno de los platos peruanos más populares y con más acogida en los restaurantes, ferias o fiestas del país. Debido al exquisito sabor que posee este platillo se ha convertido en uno de los más preferidos por niños y adultos.",
      "preparation": "Primero debemos macerar el cabrito con medio ajo, media cucharada de comino, sal y media tasa de chicha de jora durante hora y media Luego doramos en aceite la cebolla con el resto de ajo, media cucharada de comino, ají panca, ají amarillo y ají mirasol. Añadimos el zapallo loche y dejamos cocinar por 10 minutos Escurrimos el Cabrito y lo doramos. Añadimos el aderezo con el resto de la chicha de jora y dejamos cocinar durante 30 minutos aproximadamente. Por último, sazonamos al gusto y agregamos el cilantro picado.",
      "urlImg": "https://decomidaperuana.com/wp-content/uploads/2017/08/receta-de-seco-de-cabrito.jpg",
      "institute": "Establecimiento 02",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": " -11.99041933",
      "longitude": "-77.06290144"
    },
    {
      "id": 3,
      "title": "Pollo a la brasa casero",
      "description": "Sin ninguna duda cuando pensamos en satisfacer nuestros antojos indudablemente pensamos en el aroma y sabor inconfundible de un pollo a la brasa con sus papas crocantes y cremas exquisitas. Pero muchas veces no podemos salir a comprar este delicioso platillo y por ello ¿Qué pasaría si te digo que puedes hacer un riquísimo pollo a la brasa casero desde la comodidad de tu casa?.",
      "preparation": "Primero en una cacerola ponemos sal, pimienta negra molida, comino, ajo molido, una pizca de azúcar, un chorro de vinagre, un chorro de cerveza rubia. Luego colocamos el pollo y lo aderezamos con esa combinación por dentro y por fuera. Ahora le añadimos un poco de romero en polvo. Mientras calentamos el horno y ponemos el pollo en una fuente con toda su macerado para luego colocarlo en el horno por unos 45 minutos con una temperatura entre 200 y 220 grados, cada 15 minutos se debe rociar con su jugo y grasa para que dore mejor. Aparte podemos preparar las papas fritas bien crujientes para acompañar, también preparar una ensalada de su gusto, mayonesa casera, mostaza, ají casero, una chicha morada o limonada, servir todo en la mesa y listo a disfrutar del pollito a la brasa hecho con tus propias manos.",
      "urlImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBB6Yzu7VokGFopId7Orj_szs6kz6B9xyjXK1SNnW3RGc738m9MDWZ6182EgugA1kYLI&usqp=CAU",
      "institute": "Establecimiento 03",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-12.00681565",
      "longitude": "-77.05884285"
    },
    {
      "id": 4,
      "title": "Lomo Saltado",
      "description": "El Lomo saltado es un plato típico del Perú, que consiste en carne de res o lomo, como papas fritas y acompañado con una buena porción de arroz. Es uno de los platillos más representativos de la gastronomía peruana y su historia data del siglo XIX, a continuación te voy a relatar una de las recetas más famosas que está inspirada en el recetario de Gastón Acurio, así que esta receta es dedicada a este famoso chef.",
      "preparation": "Cortamos dos cebollas grandes rojas y 4 tomates chicos en tiras gruesas, un ají amarillo en cortes delgados, un poco de cebolla china, una cucharada de ajo molido y dejamos listos los ingredientes. Necesitamos lomo fino de Res o bistec, cortado en tiras gruesas, arrancamos las hojas de 8 tallos de culantro. Listas ocho cucharadas de vinagre mezclado con cuatro cucharas de sillao. Para acompañar ya debemos tener el arroz blanco preparado y las papas fritas bien crocantes. Una vez que todo está listo, echamos aceite vegetal en una sartén grande, subimos el fuego al máximo y cuando esté botando humo echamos la mitad de la carne que ya habremos sazonado con sal y pimienta. Echamos un poco de la mezcla de sillao y vinagre, colocamos la mitad de la cebolla por un minuto y retiramos, ponemos la otra mitad por otro minuto y retiramos. Echamos la mitad de los tomates, por dos minutos y retiramos, luego echamos la otra mitad, por dos minutos, retiramos y listo. Hemos logrado un sabor increíble para la carne, ahora vamos a mezclarlo todo, en la misma sartén echamos aceite y dejamos que caliente. Añadimos ajo molido por unos segundos, toda la carne, todo el tomate, añadimos el ají amarillo, toda la cebolla y lo que queda del sillao y vinagre. Dejamos por unos minutos, añadimos la cebolla china y las hojas de culantro, y listo, nuestro lomo saltado ya quedo.",
      "urlImg": "https://i0.wp.com/lacocinalatina.club/wp-content/uploads/2021/01/Lomo-Saltado-Peruano-Web.jpg?fit=700%2C467&ssl=1",
      "institute": "Establecimiento 04",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-12.05688609",
      "longitude": "-77.03773475"
    },
    {
      "id": 5,
      "title": "Arroz Chaufa Peruano",
      "description": "Es complicado saber en qué momento el chaufa se convirtió en un plato infaltable en la mesa de los peruanos, lo que si podemos saber es en que lugar y tiempo se originó. La segunda mitad del siglo XIX, miles de ciudadanos chinos llegaron a trabajar en el campo del Perú y lo poco que ganaban lo ahorraban para formar negocios propios, en su mayoría terminaba siendo un pequeño espacio donde se servía la comida de aquellos tiempos.",
      "preparation": "En una sartén echamos un chorro de aceite con media tasa de cebolla china picada muy fina. Una cucharada de ajo molido, una cucharada de kion rallado. Dejamos freír por dos minutos, añadimos media tasa de pimiento rojo picado en trozos chiquitos, una taza de alguna carne que sea de tu gusto. Dejamos dorar todo por dos minutos. Añadimos cuatro tazas de arroz cocido, añadimos el fuego al máximo y dejamos dorar hasta que el arroz se esté friendo. Cuando esté friéndose bien, damos vuelta al arroz y lo mezclamos, dejamos de mover y volvemos a dejar dorar por unos segundos. Repetimos el mismo proceso de mezclar y dejar dorar por al menos 3 veces. Añadimos cuatro cucharadas de aceite de ajonjolí, ocho cucharadas de sillao, sal, pimienta, un poquito de azúcar. Una cucharada de salsa de ostión, dos tasas de cebolla china, añadimos cuatro huevos en modo de tortilla, damos la última movida y a comer.",
      "urlImg": "https://elcomercio.pe/resizer/l6qgvlMpsT26TX8DrMJBVN7ADw0=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/A7KLHTGQDZECTBXAZPL4KG2WZI.jpg",
      "institute": "Establecimiento 05",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-12.06631014",
      "longitude": "-77.04746379"
    },
    {
      "id": 6,
      "title": "Ají de Gallina peruano",
      "description": "Ají de gallina es una de las recetas más tradicionales y populares del Perú. Se trata de un guiso a base de pollo, ají amarillo y otros ingredientes que se sirve con arroz blanco y papas sancochadas. Es un platillo rico en sabor y nutrientes, por lo que es perfecto para compartir en familia o entre amigos.",
      "preparation": "En una olla ancha o en una sartén añadimos 2 cucharadas de aceite vegetal junto con una taza de cebolla roja picada y dejamos dorar 5 minutos a fuego lento. Luego colocamos 1 cucharada de ajo molido y lo dejamos sudar 2 minutos. Ahora agregamos ¼ de taza de pasta de ají mirasol, ¼ de taza de crema de ají amarillo licuado sin venas ni pepas y 1 cucharada de ají panca licuado para darle color y dejamos cocer lentamente hasta que el aceite se separe de los ingredientes. Luego añadimos 2 rebanadas de pan de molde sin corteza previamente remojado en un chorro de leche evaporada y lo movemos con una cuchara de madera lentamente dejando que se cocine hasta que bote burbujas. A continuación añadimos una pechuga de pollo cocinada previamente en agua y sal deshuesado y deshilachado en tiras gruesas. Agregamos ahora ½ taza del caldo en donde se sancochó el pollo y dejamos cocinar unos cuantos minutos. Ahora añadimos un chorro de leche evaporada, sal, pimienta, una cucharada pecanas molidas y una cucharada de queso parmesano estos 2 últimos ingredientes son opcionales. Finalmente, se sirve en un plato unas rodajas de papas sancochadas y cubrimos con el ají de gallina agregando pecanas molidas por encima, medio huevo cocido, aceituna y ¡LISTO!.",
      "urlImg": "https://patasca.net/wp-content/uploads/2021/10/aji-de-gallina.jpg",
      "institute": "Establecimiento 06",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.9743063",
      "longitude": "-77.0414384"
    },
    {
      "id": 7,
      "title": "Receta de Caiguas Rellenas",
      "description": "La caihua rellena o también conocida como guiso de caigua no es más que la preparación del fruto de la caihua rellenado con distintos ingredientes que la dotan de un sabor incomparable. Se dice que su receta data de los años 1800-1900, aunque ya por los años 200 d.c ya había indicios que la cultura Mochica se alimentaba de este nutritivo fruto.",
      "preparation": "Ponemos a cocinar las caiguas en agua con sal unos minutos y que luego dejamos que  se enfríe en agua con hielo, y dejamos reposar por unos momentos mientras preparamos el relleno. La caigua se rellena con res, picada a cuchillos, que previamente fue guisada con abundante cebolla, poco ajo, poco ají panca y su puntito de maní. Dejamos cocinar por unos minutos el relleno hasta que tenga ese color tan característico de un aderezo, luego echamos sal, pimienta y comino al gusto. A ese guiso le agregamos una pasa, su huevito y su aceituna, ya está listo para colocarnos en nuestra caigua que previamente fue hervida. Rellenamos nuestras caiguas con nuestro guiso y las acomodamos en una olla, con más relleno y jugo, las guisamos unos minutos a fuego bajo. Las caiguas están listas, las retiramos de la olla y las acompañamos con arroz y papa al gusto.",
      "urlImg": "https://www.comidasperuanas.vip/wp-content/uploads/2020/05/caigua-rellena-1.jpg",
      "institute": "Establecimiento 07",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.9743063",
      "longitude": "-77.0567592"
    },
    {
      "id": 8,
      "title": "Chancho a la Caja China",
      "description": "Es muy popular encontrarla en Ferias y mercados de la ciudad, la caja china no solo es utilizada para cocinar el chancho o cerdo, también sirve para hacer un riquísimo pollo a las brasas, además nos da la posibilidad de preparar los chorizos, morcillas o anticuchos para acompañar.",
      "preparation": "Primero sazonamos nuestros 6 kg de panceta de chancho bien tierno con 1/4 de taza de sal y una salsa de anticuchos, la preparamos con ají mirasol, ají panca, sal, pimienta, comino, media taza de vinagre rojo, una cuchara de ajo, mezclamos todo en un tazón y le echamos a nuestro chancho solo en la parte de la carne, la piel la dejamos sin sazonar. Te puede gustar:  Receta Cuy al horno Con el carbón encendido y convertido a brasas, precalentamos nuestra caja china por unos 10 minutos a una temperatura de 150°C, agregamos cerveza en la bandeja de base de la caja. Colocamos la panceta de cerdo en la caja china con la piel hacia abajo para que sea la primera que se dore y quede más crocante, dejamos cocinar por 1 hora. Pasado el tiempo volteamos la panceta, le hacemos cortes en formas de cuadro con un cuchillo, agregamos 1/8 de taza de sal y dejamos cocinar por 1 hora más. Por último retiramos la carne y cortamos en trozos, servimos en un plato y ¡LISTO! Podemos utilizar como guarniciones, papas y camotes que cocinaremos en la rejilla de la caja china.",
      "urlImg": "https://1.bp.blogspot.com/-zywnfoUvSNk/YPYiOZYxFtI/AAAAAAAAOLQ/JgXGuCSJLMInLLQ2hycC47m9lJYgpOv-QCLcBGAsYHQ/s729/Chancho-a-la-caja-china-receta.jpg",
      "institute": "Establecimiento 08",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.9911824",
      "longitude": "-77.0667156"
    },
    {
      "id": 9,
      "title": "Ceviche peruano",
      "description": "Hoy en día nuestro Perú es reconocido mundialmente por su famosa gastronomía, pues el arte culinario de personas que ha recibido la bendición de Dios en sus manos han hecho preparar los platillos más exquisitos del mundo. Pero si hablamos de platos más exquisitos del mundo, definitivamente tenemos que nombrar a nuestro ceviche.",
      "preparation": "Cortamos un 1 kg de filete de pescado en cubos medianos, de no más de 2 cm de lado, y lo sazonamos con sal dejándolo reposar por 10 minutos en una cacerola fría. Añadimos ahora un ají limo cortado en rodajas muy finas, lo mezclamos con los trozos de pescado dejándolo reposar por 5 minutos. Agregamos ½ cebolla roja cortada en tiras finas previamente lavada y lo movemos para luego probar el punto de sal. Ahora añadimos pimienta blanca molida y lo movemos para colocar el jugo de 20 o 30 limones dependiendo de su tamaño que exprimiremos 1 a 1 sobre el pescado sin apretar demasiado, puesto que si se exprime todo el limón saldrá un sabor amargo de la piel blanco por ello con el resto se puede hacer limonada. Luego de colocar el jugo de limón sobre el pescado esperamos 1 minuto sin son pescados blancos. Por último añadimos otra cebolla roja con corte  juliana y otro ají limo. Antes de servir debemos probar su sabor para que tenga ese punto de acidez y picantito perfecto y ¡LISTO!",
      "urlImg": "https://portal.andina.pe/EDPfotografia3/Thumbnail/2019/02/20/000565530W.jpg",
      "institute": "Establecimiento 09",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.9892094",
      "longitude": "-77.0521244"
    },
    {
      "id": 10,
      "title": "Receta Cuy al horno",
      "description": "Si pensamos en platos exquisitos que identifiquen para nuestra deliciosa gastronomía se nos vienen a la mente muchísimos cómo puede ser un delicioso arroz con pollo, un exquisito seco a la norteña o un insuperable cuy al horno.",
      "preparation": "Primero colocamos en un bol 1 cuy y lo aderezamos con abundante sal esparciendo por todo su cuerpo y reservamos. Ahora en un pequeño tazón colocamos 5 dientes de ajos triturados, 1 chorro de aceite, 1 pizca de pimienta, 1 pizca de comino, 1 pizca de sal y mezclamos todos los ingredientes. Luego añadimos el jugo de 1 limón, 5 flores de huacatay y volvemos a mezclar los ingredientes. Una vez hecho todos los pasos aderezamos el cuy por dentro y por fuera con la preparación que acabamos de hacer, introducimos por dentro de su cuerpo 9 ramas de huacatay dobladas, lo colocamos en una fuente y lo llevamos al horno por 1 hora aproximadamente a 250º. Por último verificamos la correcta cocción del cuy y lo dejamos en el horno más tiempo de ser necesario, servimos en un plato y ¡LISTO!",
      "urlImg": "https://comeperuano.b-cdn.net/wp-content/uploads/2020/05/receta-cuy-frito.....jpg",
      "institute": "Establecimiento 10",
      "addressInstitute": "Buenos aire, formosa 234555",
      "latitude": "-11.9605076",
      "longitude": "-77.0811618"
    },
    
  ]

const usuariosGet = async(req = request, res = response) => {

   /* var ip = require("ip");
    var ipaddress = ip.address()

    console.log( ip.address() );*/

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]).catch(error => { throw error});

    res.json({
        total,
        usuarios
    });
}

const loadMovi = async(req = request, res = response) => {

  try{
      res.json(testMovie);
    }catch(error){
      res.status(500).json(errorBody)
    }

}

const loadRecipes = async(req = request, res = response) => {

    try{
        res.json(testRecipes);
        //res.status(404).json(errorBody)
      }catch(error){
        res.status(500).json(errorBody)
      }
  
  }


const usuariosPost = async(req, res = response) => {
    
    const { nombre,apellidos, correo, password,telefono,direccion,img} = req.body;
    const usuario = new Usuario({ nombre,apellidos, correo,password,telefono,direccion, img});
  

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save().catch(error => { throw error});

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto ).catch(error => { throw error});

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDeleteInactive = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } ).catch(error => { throw error});


    res.json(usuario);
}

const usuariosActive = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: true } ).catch(error => { throw error});


  res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos

    const usuario = await Usuario.findByIdAndDelete( id).catch(error => { throw error});


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDeleteInactive,
    usuariosDelete,
    usuariosActive,
    loadMovi,
    loadRecipes
}