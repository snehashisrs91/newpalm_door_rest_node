const { addListener } = require("nodemon");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;



exports.calculate_bom = async(req, res) =>{

    let custId = req?.body?.quotes?.window_option?.customer_id;
    if(!req?.body?.quotes?.window_option?.customer_id){
        res.status(500).send("Please provide customer details");
    }
    let customerMarkup = null;

    let data = {};
    console.log("---- START BOM ----");
      

    var selectSql = `SELECT id, customer_id, user_id, windows_markup, windows_markup_type, screen_markup,
                    screen_markup_type, exterior_markup, exterior_markup_type, interior_markup, interior_markup_type, hardware_markup, hardware_markup_type, interior_acc_markup, interior_acc_markup_type, exterior_acc_markup, exterior_acc_markup_type, glass_markup, glass_markup_type, miscellaneous_markup, miscellaneous_markup_type, series_markup, series_markup_type, is_active, created_date, created_by, modified_by, modified_date
                    FROM customer_markup where customer_id = ${custId} `;         
    await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (custMarkUp) {      
        customerMarkup = custMarkUp[0];
    })
    .catch(err => {
        res.status(400).send({ message: err.message });
    });

    if(!customerMarkup){
        res.status(500).send("Please set customer markup first");
    }

    var windowOption = await getWindowDetails(customerMarkup, req?.body?.quotes?.window_option);
    data.window_option= windowOption;
    var unitOption = await getUnitDetails(customerMarkup, req?.body?.quotes?.unit_option);
    data.unit_option = unitOption;    
    var glassOption = await getGlassDetails(customerMarkup, req?.body?.quotes?.glass_option);
    data.glass_option =glassOption;

    console.log("UOL "+req?.body?.quotes?.unit_option.length)
    var joinBom = 0;
    if(req?.body?.quotes?.window_option?.join_bom && req?.body?.quotes?.unit_option){
        joinBom = req?.body?.quotes?.window_option?.join_bom * req?.body?.quotes?.unit_option.length;
    }

    data.join_bom = joinBom;
    data.customer_discount = req?.body?.quotes?.window_option?.customer_discount || 0.0;
    data.total = 0.0;
    
    console.log("----END BILL OF MATERIAL----")
    res.status(200).send(data);
};





async function getWindowDetails(customerMarkup, windowOption) {
    
    let price = [];
    let series = {};
    
    if(windowOption?.series_id){
        var selectSql = `select series_name, bom from series s where series_id = ${windowOption?.series_id} `;         
        await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
        .then(function (seriesValue) {      
            series.name = seriesValue[0].series_name;
            series.bom = parseFloat(seriesValue[0].bom);
        })
        .catch(err => {
            console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in series select sql");
            return;
        });
    }

    console.log("SE " + customerMarkup.series_markup);
    series.markup = parseFloat(customerMarkup.series_markup);
    if(customerMarkup.series_markup_type.toUpperCase() === 'P'){
        series.markup_type = "plus";
        series.calculated_amount = series.bom + series.markup;
    } else {
        series.markup_type = "minus";
        series.calculated_amount = series.bom - series.markup;
    }

    price.push(series);
    let window_option = {price};
    window_option.window_total = series.calculated_amount;

    return window_option;

}

async function getUnitDetails(customerMarkup, unitOption) {
    let unit_option = [];
    
    unitOption.forEach(async (data) => {
        //console.log("1 ------------------------->>> >> > " + data.exterior_colour_id);
        let window_type = {};
        let screen = {};
        let exterior_colour = {};
        let interior_colour = {};
        let hardware = {};
        let exterior_accesseries = {};
        let interior_accesseries = {};
        

        let price = [];
        let unit = {};
        let unitprice = 0;
        if(data?.window_type_id) {
           //console.log("2 ------------------------>>> >> > " + "window type");
           price.push(window_type);      
        }

        if(data?.screen_id) {
            //console.log("3 ------------------------>>> >> > " + "Screen type");  
            price.push(screen);    
         }

        

        if(data?.exterior_colour_id){

            //console.log("4 ------------------------->>> >> > " + data.exterior_colour_id);

            var ecSelectSql = `select name, bom from colour_master where id = ${data?.exterior_colour_id} `;         
             sequelize.query(ecSelectSql, { type: sequelize.QueryTypes.SELECT })
            .then(function (excValue) {
                //console.log("5 ------------------------->>> >> > " + data.exterior_colour_id);   
                exterior_colour.name = excValue[0].name;
                exterior_colour.bom = parseFloat(excValue[0].bom);
                //console.log("6 ------------------------->>> >> > " + exterior_colour);
                exterior_colour.markup = parseFloat(customerMarkup.exterior_markup);
                if(customerMarkup?.exterior_markup_type.toUpperCase() === 'P'){
                    exterior_colour.markup_type = "plus";
                    exterior_colour.calculated_amount = exterior_colour.bom + exterior_colour.markup;
                    unitprice = unitprice+(exterior_colour.bom + exterior_colour.markup);
                } else {
                    exterior_colour.markup_type = "minus";
                    exterior_colour.calculated_amount = exterior_colour.bom - exterior_colour.markup;
                    unitprice = unitprice +(exterior_colour.bom - exterior_colour.markup);
                }
                //console.log("7 ------------------------->>> >> > " + exterior_colour.name +" - " + exterior_colour.bom + " - " + exterior_colour.markup_type +" - " + exterior_colour.markup);

            })
            .catch(err => {
                console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in exterior colour_master select sql");
                return;
            });
            console.log(exterior_colour.calculated_amount);
            
            price.push(exterior_colour)
        }

        if(data?.interior_colour_id) {
            //console.log("I C -------**------");
            var icSelectSql = `select name, bom from colour_master where id = ${data?.interior_colour_id} `;

             sequelize.query(icSelectSql, { type: sequelize.QueryTypes.SELECT })
            .then(function (incValue) {
                //console.log("8 ------------------------->>> >> > " + data.interior_colour_id);   
                interior_colour.name = incValue[0].name;
                interior_colour.bom = parseFloat(incValue[0].bom);
                //console.log("9 ------------------------->>> >> > " + interior_colour);
                interior_colour.markup = parseFloat(customerMarkup.exterior_markup);
                if(customerMarkup?.interior_markup_type.toUpperCase() === 'P'){
                    interior_colour.markup_type = "plus";
                    interior_colour.calculated_amount = interior_colour.bom + interior_colour.markup;
                } else {
                    interior_colour.markup_type = "minus";
                    interior_colour.calculated_amount = interior_colour.bom - interior_colour.markup;
                }
                //console.log("10 ------------------------->>> >> > " + interior_colour.name +" - " + interior_colour.bom + " - " + interior_colour.markup_type +" - " + interior_colour.markup);

            })
            .catch(err => {
                console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in interior colour_master select sql");
                return;
            });
            unitprice = unitprice + interior_colour.calculated_amount;
            price.push(interior_colour);
        }

        if(data?.hardware_id) {
            //console.log("I C -------**------");
            var hardwareSelectSql = `select hardware_type_name, bom from hardware_type_master where hardware_type_id = ${data?.hardware_id} `;

             sequelize.query(hardwareSelectSql, { type: sequelize.QueryTypes.SELECT })
            .then(function (hardwareValue) {
                //console.log("8 ------------------------->>> >> > " + data.hardware);   
                hardware.name = hardwareValue[0].hardware_type_name;
                hardware.bom = parseFloat(hardwareValue[0].bom);
                //console.log("9 ------------------------->>> >> > " + interior_colour);
                hardware.markup = parseFloat(customerMarkup.hardware_markup);
                if(customerMarkup?.hardware_markup_type.toUpperCase() === 'P'){
                    hardware.markup_type = "plus";
                    hardware.calculated_amount = hardware.bom + hardware.markup;
                } else {
                    hardware.markup_type = "minus";
                    hardware.calculated_amount = hardware.bom - hardware.markup;
                }
                //console.log("10 ------------------------->>> >> > " + interior_colour.name +" - " + interior_colour.bom + " - " + interior_colour.markup_type +" - " + interior_colour.markup);

            })
            .catch(err => {
                console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in hardware_type_master select sql");
                return;
            });
            unitprice = unitprice + hardware.calculated_amount;
            price.push(hardware);
        }

        if(data?.exterior_accesseries_id) {
            
            var extaSelectSql = `select exterior_name, bom from manufac_exterioraccessories_master where exterior_id = ${data?.exterior_accesseries_id} `;

             sequelize.query(extaSelectSql, { type: sequelize.QueryTypes.SELECT })
            .then(function (exaValue) {
                //console.log("8 ------------------------->>> >> > " + data.hardware);   
                exterior_accesseries.name = exaValue[0].exterior_name;
                exterior_accesseries.bom = parseFloat(exaValue[0].bom);
                //console.log("9 ------------------------->>> >> > " + interior_colour);
                exterior_accesseries.markup = parseFloat(customerMarkup.exterior_acc_markup);
                if(customerMarkup?.exterior_acc_markup_type.toUpperCase() === 'P'){
                    exterior_accesseries.markup_type = "plus";
                    exterior_accesseries.calculated_amount = exterior_accesseries.bom + exterior_accesseries.markup;
                } else {
                    exterior_accesseries.markup_type = "minus";
                    exterior_accesseries.calculated_amount = exterior_accesseries.bom - exterior_accesseries.markup;
                }
                //console.log("10 ------------------------->>> >> > " + interior_colour.name +" - " + interior_colour.bom + " - " + interior_colour.markup_type +" - " + interior_colour.markup);

            })
            .catch(err => {
                console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in manufac_exterioraccessories_master select sql");
                return;
            });
            unitprice = unitprice + exterior_accesseries.calculated_amount;
            price.push(exterior_accesseries);
        }

        
        if(data?.interior_accesseries_id) {
            
            var intaSelectSql = `select interior_name, bom from manufac_interioraccessories_master where interior_id = ${data?.interior_accesseries_id} `;

             sequelize.query(intaSelectSql, { type: sequelize.QueryTypes.SELECT })
            .then(function (intaValue) {
                //console.log("8 ------------------------->>> >> > " + data.hardware);   
                interior_accesseries.name = intaValue[0].interior_name;
                interior_accesseries.bom = parseFloat(intaValue[0].bom);
                //console.log("9 ------------------------->>> >> > " + interior_colour);
                interior_accesseries.markup = parseFloat(customerMarkup.interior_acc_markup);
                if(customerMarkup?.interior_acc_markup_type.toUpperCase() === 'P'){
                    interior_accesseries.markup_type = "plus";
                    interior_accesseries.calculated_amount = interior_accesseries.bom + interior_accesseries.markup;
                } else {
                    interior_accesseries.markup_type = "minus";
                    interior_accesseries.calculated_amount = interior_accesseries.bom - interior_accesseries.markup;
                }
                //console.log("10 ------------------------->>> >> > " + interior_colour.name +" - " + interior_colour.bom + " - " + interior_colour.markup_type +" - " + interior_colour.markup);

            })
            .catch(err => {
                console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in manufac_interioraccessories_master select sql");
                return;
            });
            unitprice = unitprice + interior_accesseries.calculated_amount;
            price.push(interior_accesseries);
        }

        unit.price = price;
        unit.unit_total = unitprice;
        unit_option.push(unit);
    });

    return unit_option;
}

async function getGlassDetails(customerMarkup, glassOption) {
    
    let price = [];
    let glOp = {};
    
    if(glassOption?.glass_types_master_id){
        var selectSql = `select name, bom from glass_types_master where id = ${glassOption?.glass_types_master_id} `;         
        await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
        .then(function (value) {      
            glOp.name = value[0].name;
            glOp.bom = parseFloat(value[0].bom);
        })
        .catch(err => {
            console.log("ERROR: " + err.code + " (" + err.message + ")" + " error in glass_types_master select sql");
            return;
        });
    }

    glOp.markup = parseFloat(customerMarkup.glass_markup);
    if(customerMarkup.glass_markup_type.toUpperCase() === 'P'){
        glOp.markup_type = "plus";
        glOp.calculated_amount = glOp.bom + glOp.markup;
    } else {
        glOp.markup_type = "minus";
        glOp.calculated_amount = glOp.bom - glOp.markup;
    }

    price.push(glOp);
    let glass_option = {price};
    glass_option.glass_total = glOp.calculated_amount;
    return glass_option;

}
