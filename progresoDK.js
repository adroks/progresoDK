var progressDK = new Class({
	Implements: [Options, Events],
	options: {
		urlCrawl: '' // url del fichero que generará el array
		, dataCrawl: '' //si necesitamos algún query para extraer datos
		, urlCreate: '' // url del fichero que realizará la acción de cada elemento del array
		, synch: 5 // numero de tareas a la vez
		, mode: 'default' // modo lista o modo único
		, funcion: false // podemos pasarle una función que se ejecutará en vez de urlCreate
	}
	/* las variables que saquemos de cada elemento en urlCrawl, serán las mismas que pidamos en el urlCreate*/
	,initialize: function(container, opciones){
		this.setOptions(opciones);
		this.elementContainer	= typeOf(container)=='element' ? container : $(container);
		if(this.options.urlCrawl!=''){//si la url de búsqueda es nula o vacía, no continuamos
			if(this.options.urlCreate==''){this.options.urlCreate=this.options.urlCrawl}
			this.queue	= 0;
			this.next	= 0;
			this.done	= 0;
			this.stop	= false;
			this.pause	= false;
			this.isList	= this.options.mode=='default';

			this.createUI();
			this.crawl();
		}
	},
	createUI: function(){//creamos los elementos, si ya existen los asignamos a sus variables
		if(this.elementContainer.get('data-progress')){
			this.pdkContainer	= this.elementContainer.getElements('.pdkContainer')[0];
			this.pdkContainer.setStyles({'display':'block'});
			this.pdkLog		= this.pdkContainer.getElements('.pdkLog')[0];
			this.pdkBar		= this.pdkContainer.getElements('.pdkBar')[0];
			this.pdkPercent		= this.pdkContainer.getElements('.pdkPercent')[0];
			this.pdkClose		= this.pdkContainer.getElements('.pdkClose')[0];
			this.pdkPause		= this.pdkContainer.getElements('.pdkPause')[0];
			this.stop		= false;
			this.pause		= false;
			this.pdkPause.setStyles({'display': 'block'});
			this.log('', 1);
		}else{
			this.elementContainer.set('data-progress', '1')
			this.pdkContainer	= new Element('div.pdkContainer').inject(this.elementContainer);
			this.pdkClose		= new Element('input[type=button].pdkButton.pdkClose').inject(this.pdkContainer);
			this.pdkPause		= new Element('input[type=button].pdkButton.pdkPause').inject(this.pdkContainer);

			this.pdkLog		= new Element((this.isList ? 'ul' : 'span') + '.pdkLog');
			new Element('div.' + (this.isList ? 'pdkLogContainer' : 'pdkLogOne')).inject(this.pdkContainer).adopt(this.pdkLog);

			this.pdkBar		= new Element('span.pdkBar[style=width:0%]');
			this.pdkPercent		= new Element('span.pdkPercent[html=]');
			new Element('div.progressBarContainer').inject(this.pdkContainer).adopt(this.pdkBar, this.pdkPercent);
		}
		// asignamos los eventos a los botones
		this.pdkClose.addEvent('click', function(){// si no ha acabado, se cancelan los siguientes request, y luego se elimina, en caso contrario se elimina directamente
			this.stop = true;
			if(this.done==this.length){this.hide()}
		}.bind(this));
		this.pdkPause.addEvent('click', function(){
			this.pause = !this.pause;
			if(!this.pause){
				this.pdkPause.removeClass('play');
				this.loop(this.next);
			}else{
				this.pdkPause.addClass('play');
				this.log('Se pausará la tarea cuando acaben los request actuales.', 1);
			}
		}.bind(this));
	},
	crawl: function(){//obtenemos el array por JSON
		new Request.JSONP({
			url: this.options.urlCrawl,
			callbackKey: 'co', // usar el mismo querystring al principio del JSON
			data: this.options.dataCrawl,
			onComplete: function(array){
				this.array = array;
				this.length = array.length;
				this.loop(0);
			}.bind(this)
		}).send();
	},
	loop: function(number){//recorremos el array
		if(this.queue>this.options.synch){//si la cola es mayor que el limite, esperamos un segundo antes de mandar el mismo
			(function(){
				this.loop(number);
			}.bind(this)).delay(1000);
		}else{
			//comprobamos antes que no se haya parado, pausado y que no hayan sobrepasado el numero de elementos del array
			if(!this.stop && !this.pause && number<this.length){
				this.queue++;
				this.next++;
				if(this.options.funcion){
					this.success(this.options.funcion(this.array[number]));
				}else{
					this.request(number);
				}
				this.loop(this.next);
			}
		}
	},
	request: function(number){
		new Request({
			url:	this.options.urlCreate,
			data:	this.array[number],
			async:	true,
			method:	'get',
			onSuccess: function(responseText){
				this.success(responseText);
			}.bind(this)
		}).send();
	},
	success: function(text){
		this.done++;
		this.queue--;
		this.log(text);//mostramos el resultado de la consulta
		var perc = Math.round((this.done/this.length) * 100);
		this.pdkPercent.set('html', perc + '%');
		this.pdkBar.setStyles({'width': perc + '%'});
		if(this.done==this.length){//mensaje de finalizado
			this.log('Completado, Total: <b>'+ this.length + '</b>', 1);
			this.pdkPause.setStyles({'display': 'none'});
		}
		if(this.stop && this.queue==0){this.hide();}
	},
	log: function(text, style){
		if(this.isList){
			var li = new Element('li[html=' + text + ']').inject(this.pdkLog, 'top');
			if(style){li.addClass('last')}
		}else{
			this.pdkLog.set('html', text);
		}
	},
	hide: function(){//vaciamos y ocultamos el contenedor
		this.pdkLog.empty();
		this.pdkContainer.setStyles({'display':'none'});
	}
});
