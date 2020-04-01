const router = require("express").Router();
const mongoose = require("mongoose");
require("../../models/Menu");
const Menus = mongoose.model("menu");
const { check, validationResult } = require("express-validator");

// @route  GET api/menus
// @access Public
router.get("/", async (req, res, next) => {
  try {
    const menus = await Menus.find();
    if (menus.length <= 0) {
      return res.status(400).json({
        msg: "No menus found"
      });
    }
    const sortedMenus = menus.sort((a, b) => {
      return a.order - b.order;
    });

    res.status(200).json(sortedMenus);
  } catch (error) {
    next(error)
  }
});


router.get("/id/:id", async (req, res) => {
  try {
    const menu = await Menus.findById(req.params.id);
    if (!menu) {
      return res.status(400).json({
        msg: "No menu found"
      });
    }
    res.status(200).json(menu);
  } catch (error) {
    next(error)
  }
});

router.post('/',  async(req, res, next)=>{
  try {
      // const menu = await Menu.find();
    
      const errors= [];
      const {name, url, parentElement, checkActive, order} = req.body;

      if(!url){
          errors.push({text:'url is required'});
      }
      if(!order){
          errors.push({text:'Order is required'});
      }
      if(!name){
          errors.push({text:'Name is required'});
      }
      if(errors.length>0){
        return res.status(400).json({
          msg: errors
        });ß
      }
      let status = '';
      checkActive ? status = 'Enabled': status = 'Disabled'; 
      if(parentElement === 'topLevel'){
          const newMenuItem = {
              name,url, status, order
          };
          const newItem = new Menus(newMenuItem);
        
          await newItem.save();
          return res.status(200).json(newItem);
      }
      const topMenuElement = await Menus.findOne({
          name: parentElement
      });
      const subMenu = topMenuElement.subMenu;
      const subMenuItem = {name, url, status, order};
      subMenu.push(subMenuItem);
      const ubdatedMenu = await topMenuElement.save();
      return res.status(200).json(ubdatedMenu);
    } catch (error) {
      console.log(error);
      next(error);
  }
});

router.put('/:id', async(req, res, next)=>{
  try {
    console.log(req.body)
      const menuItem  = await Menus.findById(req.params.id);
      console.log(menuItem)
      const {name, url, order, status} = req.body;
      if(!menuItem){

          const mainItem = await Menus.findOne({'subMenu._id': req.params.id});
          const itemIndex = mainItem.subMenu.findIndex(item => {
              const items =  item._id == req.params.id;
              return items;
          });
          
          const item = mainItem.subMenu[itemIndex];
          item.name = name;
          item.url = url;
          item.status = status;
          item.order = order;
          mainItem.subMenu.splice(itemIndex,1,item);
          const saveIitem = await mainItem.save();
          return res.status(200).json(saveIitem)
          
      }
      menuItem.name = name;
      menuItem.url = url;
      menuItem.status = status;
      menuItem.order = order; 
      const save = await menuItem.save();   
      return res.status(200).json(save)

     
  } catch (error) {
      console.log(error);
      next(error); 
  }
});



module.exports = router;
