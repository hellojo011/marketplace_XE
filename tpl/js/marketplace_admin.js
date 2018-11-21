/**
 * @file   modules/marketplace/js/marketplace_admin.js
 * @author NHN (developers@xpressengine.com)
 * @brief  marketplace 모듈의 관리자용 javascript
 **/
/* complete to insert marketplace module */
function completeInsertMarketplace(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;

	var page = ret_obj.page;
	var module_srl = ret_obj.module_srl;

	alert(message);

	var url = current_url.setQuery('act','dispMarketplaceAdminMarketplaceInfo');
	if(module_srl) url = url.setQuery('module_srl',module_srl);
	if(page) url.setQuery('page',page);
	location.href = url;
}

/* delete the marketplace module*/
function completeDeleteMarketplace(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var page = ret_obj.page;
	alert(message);

	var url = current_url.setQuery('act','dispMarketplaceAdminContent').setQuery('module_srl','');
	if(page) url = url.setQuery('page',page);
	location.href = url;
}

/* update category */
function doUpdateCategory(category_srl, mode, message)
{
	if(typeof(message)!='undefined'&&!confirm(message)) return;

	var fo_obj = xGetElementById('fo_category_info');
	fo_obj.category_srl.value = category_srl;
	fo_obj.mode.value = mode;

	procFilter(fo_obj, update_category);
}

/* change category */
function completeUpdateCategory(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var module_srl = ret_obj.module_srl;
	var page = ret_obj.page;
	alert(message);

	var url = current_url.setQuery('module_srl',module_srl).setQuery('act','dispMarketplaceAdminCategoryInfo');
	if(page) url.setQuery('page',page);
	location.href = url;
}

/* setup all*/
function doCartSetup(url)
{
	var module_srl = [];
	jQuery('#fo_list input[name=cart]:checked').each(function()
	{
		module_srl[module_srl.length] = jQuery(this).val();
	});

	if(module_srl.length<1) return;

	url += "&module_srls="+module_srl.join(',');
	popopen(url,'modulesSetup');
}

/* setup index */
function doInsertItem()
{
	var target_obj = xGetElementById('targetItem');
	var display_obj = xGetElementById('displayItem');
	if(!target_obj || !display_obj) return;

	var text = target_obj.options[target_obj.selectedIndex].text;
	var value = target_obj.options[target_obj.selectedIndex].value;

	for(var i=0;i<display_obj.options.length;i++) if(display_obj.options[i].value == value) return;

	var obj = new Option(text, value, true, true);
	display_obj.options[display_obj.options.length] = obj;

}
function doDeleteItem()
{
	var sel_obj = xGetElementById('displayItem');
	var idx = sel_obj.selectedIndex;
	if(idx<0 || sel_obj.options.length<2) return;
	sel_obj.remove(idx);
	sel_obj.selectedIndex = idx-1;
}
function doMoveUpItem()
{
	var sel_obj = xGetElementById('displayItem');
	var idx = sel_obj.selectedIndex;
	if(idx<1 || !idx) return;

	var text = sel_obj.options[idx].text;
	var value = sel_obj.options[idx].value;

	sel_obj.options[idx].text = sel_obj.options[idx-1].text;
	sel_obj.options[idx].value = sel_obj.options[idx-1].value;
	sel_obj.options[idx-1].text = text;
	sel_obj.options[idx-1].value = value;
	sel_obj.selectedIndex = idx-1;
}
function doMoveDownItem()
{
	var sel_obj = xGetElementById('displayItem');
	var idx = sel_obj.selectedIndex;
	if(idx>=sel_obj.options.length-1) return;

	var text = sel_obj.options[idx].text;
	var value = sel_obj.options[idx].value;

	sel_obj.options[idx].text = sel_obj.options[idx+1].text;
	sel_obj.options[idx].value = sel_obj.options[idx+1].value;
	sel_obj.options[idx+1].text = text;
	sel_obj.options[idx+1].value = value;
	sel_obj.selectedIndex = idx+1;
}

function doSaveListConfig(module_srl)
{
	if(!module_srl) return;
	var sel_obj = xGetElementById('displayItem');
	var idx = sel_obj.selectedIndex;

	var list = [];
	for(var i=0;i<sel_obj.options.length;i++) list[list.length] = sel_obj.options[i].value;
	if(list.length<1) return;
	
	var params = {};
	params.module_srl = module_srl;
	params.list = list.join(',');

	var response_tags = new Array('error','message');

	exec_json('marketplace.procMarketplaceAdminInsertListConfig', params, function() { location.reload(); });
}

function doDeleteCondition(module_srl, eid)
{
	if(!module_srl || !eid) return;

	var params = [];
	params.module_srl = module_srl;
	params.eid = eid;

	exec_xml('marketplace','procMarketplaceAdminDeleteItemCondition', params, function(){location.reload();});
}

function moveCondition(type, module_srl, eid) {
    var params = {
		type       : type,
		module_srl : module_srl,
		eid    : eid
	};
    var response_tags = ['error','message'];
    exec_xml('document','procMarketplaceAdminMoveItemCondition', params, function() { location.reload() });
}

$(function() {
    $('#row_dim').hide(); 
    $('#type').change(function(){
        if($('#type').val() == 'parcel') {
            $('#row_dim').show(); 
        } else {
            $('#row_dim').hide(); 
        } 
    });
})(jQuery);