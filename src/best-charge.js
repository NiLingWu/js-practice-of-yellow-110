function bestCharge(selectedItems) {
  var allitem = new Array();
  allitem = loadAllItems();
  var saleoff = new Array();
  saleoff = loadPromotions();

  var list = new Array();

  let a = '============= 订餐明细 =============' + '\n' ;

  var sum = 0,sum1 = 0,sum2 =0;
  selectedItems.forEach(function (item) {
    var money = 0;
    var thing;
    allitem.forEach(function (aitem) {
      thing = aitem;
        if(aitem.id ==item.substr(0,item.indexOf(' x ')))
        {
          var num =item.substr(item.indexOf(' x ')+3,item.length);
          money = parseInt(aitem.price) * num;
          a +=  aitem.name + ' x ' + num + ' = ' +money + '元' + '\n';
          sum += money;
          thing.num = num;
          thing.money = money;
          list.push(thing);
        }
    });
  });

  sum1=sum;
  sum2=0;
  saleoff.forEach(function (sale) {
    if(sale.type == '满30减6元')
    {
      if(sum>=30)
      {
        sum1 = sum1 -6 ;
      }
    }
    else if(sale.type == '指定菜品半价')
    {

      list.forEach(function (listitem) {
        sale.items.forEach(function (saleitem) {
          if(saleitem == listitem.id)
          {
            listitem.money = listitem.money/2;
          }
        });
      });
      list.forEach(function (listitem) {
        sum2+=listitem.money;
      });
    }
  });

  var sheng = sum -sum2;
  if(sheng>6)
  {
    sum = sum2;
    a +=  '-----------------------------------'
      + '\n' + '使用优惠:'
      + '\n' + '指定菜品半价(黄焖鸡，凉皮)，省'+sheng+'元'
      + '\n' ;
  }
  else if(sheng!=0)
  {
    sum = sum1;
    a +=  '-----------------------------------'
      + '\n' + '使用优惠:'
      + '\n' + '满30减6元，省6元'
      + '\n' ;
  }

  a +=  '-----------------------------------'
    + '\n' + '总计：' + sum + '元' + '\n' + '===================================';

  return a;
}
