var Page = {
	/*  Class(Object) Page.
			description:
				Main class for document style preset, active elements and modifications.

			attributes:
				---------------------------------------------------
				|name            | type               | desription
				---------------------------------------------------
				domain_result    | boolean \ HTMLelem | is div from .base_form innerHTML with special result elem
				elems            | Array              | array with optiont for Page active elements;
				getBy            | Array              | array with getElement's methods used on Page;
				is_attention     | boolean \ HTMLelem | does special arention element is visible;
				submit_activated | boolean \ HTMLelem | does submit button available for user.

			methods:
				constructor: {
					varibles:
						none.
			
					return:
						none.

					desription: 
						check screen size and include special css style.
				},
				
				onload: {
					varibles:
						none.
			
					return:
						none.

					desription: 
						parse page use Page Elem array;
							find elems (used id||tag||class from array);
								connect to page basic elems methods and attributes from Page.elems array.
				},
				
				set_elem_Attributes: {
					varibles:
						required:
							elem 	- HTML elem - elem from documen for preset;
							diction - Array     - Array from Page.Elems with some elem data;
						
					return:
						none.

					desription: 
						use preset from Page.elems['elem name'] Array for set document elemnt.
				},

				find_element_or_elements: {
					varibles:
						required:
							element - Array - object from Page.elems.
			
					return:
						if data have class or tag:
							Array with HTMLelems.
						else:
							HTMTelement. 
						
						*from document.

					desription: 
						parse Elem Array data(id, tag, class) from Page.elems, 
						if data != null use this for find elem from document.
				},

				click_animation: {
					varibles:
						required: 
							elem - HTMLelement - element to animate.
						
						optional:
							style       - string 
								default - 'resize'  - use for standart click animation;
										- 'recolor' - use for set grey element backgrounColor.

							resize_index - Array
								default - [
									0.97 - element clicked width; 
									0.94 - element clicked heigth; 
								]
								* formula for undestd how riseze work: 
									elem.style.width*resize_index[0];
									elem.style.heigth*resize_index[1].

					return:
						none.

					desription: 
						animate HTMLelement from document.
				},

				is_url: {
					varibles:
						required: 
							val - string - some sting.
			
					return:
						bolean:
							if val is url true;
							else false.

					desription: 
						parse val and return boolean.
				},

				attention: {
					varibles:
						optional:
							text 
								defalt - '';
								- sting  - string for inner in attention element.

							bg   - 
								defalt - 'red';
								string - string with css color format for attention backgrounColor.
							
					return:
						attenton element.

					desription: 
						create in visible page top special element with some information.
				},
				
				scrollTop: {
					varibles:
						none.

					return:
						string - scroll top POS in px.

					desription: 
						find scroll top position in many browsers;				
				}

	*/

	elems: {
		/* It is special Array next format:
			'key for element': {
				id:    'document element ID' | null,
				tag:   'document elements tag' | null,
				class: 'document elements class' | null,
			
				attributes: {
					'some HTMLelement atributes': parametr || function will connect to EQU page element.
				},
				
				methods: {
					'name': 'function()'
					* to haven't mistake methods should create only with only one element(with ID not tag/class)
				}		
			}
		*/

		ACC_submit: {
			id: "ACC_submit",
			tag: false,
			class: false,

			attributes: {
				onclick: function(event){
					event.preventDefault();
					alert("Регистрация временно недоступна.");

					Page.ACC_submit.style.display = ''
					Page.acc_create_page[0].methods.deactivate();
				}
			}
		},

		acc_create_buttons: {
			id: false,
			tag: false,
			class: "AccountCreateButton",

			attributes: {
				onclick: function() {
					Page.click_animation(this, 'resize', [1, 0.97]);

					var visibility = Page.acc_create_page[0].style.display;
					if (visibility === "") {
						Page.acc_create_page[0].style.display = 'block';
					}
					else {Page.attention("Форма уже открыта.");}
				}
			},
		},

		acc_create_page: {
			id: false,
			tag: false,
			class: "AccountCreatePage",

			attributes: {
				onclick: function() {
					this.onmousemove();
				},

				onmousemove: function() {
					var inputs;

					if (Page.ACC_doc_status.inputs === undefined) {
						inputs = Page.ACC_doc_status.inputs = Array.prototype.slice.call(Page.acc_create_page[0].getElementsByTagName('input'));
					}
					else {inputs = Page.ACC_doc_status.inputs;}
					if (Page.ACC_doc_status.result) {
						

						if (inputs[0].value.length > 2 & inputs[1].value.length > 10) {
							Page.ACC_submit.style.display = 'inline-block';
						}
					}
					else{
						Page.ACC_submit.style.display = '';
					}
				}
			},

			methods: {
				deactivate: function() {
					var inps = Page.ACC_doc_status.inputs;
					
					Page.acc_create_page[0].style.display = '';
					Page.ACC_document.methods.deactivate();
					Page.ACC_doc_status.methods.deactivate();

					for (var n in inps) {inps[n].value = "";}
				}
			}
		},

		ACC_upload: {
			id: "ACC_upload",
			tag: false,
			class: false,

			attributes: {
				onclick: function(){
					if (!Page.ACC_doc_status.run | Page.ACC_doc_status.run === undefined) {
						Page.ACC_document.click();
					}
					else {Page.attention("отклонено обрабатывается файл.");}
				}
			}
		},

		ACC_close: {
			id: "ACC_close",
			tag: false,
			class: false,

			attributes: {
				onclick: function(){
					Page.acc_create_page[0].methods.deactivate();
					Page.ACC_doc_status.run = false;
				}
			}
		},

		ACC_document: {
			id: "ACC_document",
			tag: false,
			class: false,

			attributes: {
				onchange: function(event) {
					var val = this.value;
					
					if (val !== "") {
						Page.ACC_INFOspan.innerHTML = "обработка файлов"
						Page.ACC_doc_status.src   = "./content/shaders/uploader/wait.svg";

						return Page.ACC_doc_status.methods.rotate();
					}

					else {this.methods.deactivate();}
				}
			},

			methods: {
				deactivate: function(txt) {
					var txt = (txt !== undefined) ? txt:"*Документы";

					Page.ACC_doc_status.src     = "./content/shaders/uploader/upload.svg";
					Page.ACC_INFOspan.innerHTML = txt;
				}
			}
		},
		
		ACC_INFOspan: {
			id: "ACC_INFOspan",
			tag: false,
			class: false,

			attributes: {
			}
		},

		ACC_doc_status: {
			id: "ACC_doc_status",
			tag: false,
			class: false,

			attributes: {
			},

			methods: {
				rotate: function() {
					var self = Page.ACC_doc_status,
						circ = 360;
						
					function play(step) {
						var visibility = Page.acc_create_page[0].style.display;
						self.style.transform = "rotate(" + step + "deg)";
						
						if (step == 80)  {Page.ACC_INFOspan.innerHTML = "отцифровка данных";}
						if (step == 240) {Page.ACC_INFOspan.innerHTML = "анализ результатов";}
						if (visibility === '') {return Page.ACC_doc_status.methods.deactivate();}

						if (step < circ) {setTimeout(function(){return play(step+8)}, 100);}
						else {
							var random = (Math.random() * 5) < 2.5;
							Page.ACC_doc_status.run = false;

							self.style.transform = "rotate(0deg)";
							return Page.ACC_doc_status.methods.curent_status(random);
						}
					}

					Page.ACC_doc_status.run = true;
					return play(8);
				},

				curent_status: function(bool) {
					var INFOspan = Page.ACC_upload.getElementsByTagName("span")[0];
					
					if (bool) {
						Page.ACC_doc_status.src    = "./content/shaders/uploader/ok.svg";
						INFOspan.innerHTML         = "данные подтверждены";
						Page.ACC_doc_status.result = true;
					}

					else {
						Page.ACC_document.methods.deactivate('<span style="color: DarkRed;">Данные некорректны');
						Page.ACC_doc_status.result = false;
					}
				},

				deactivate: function(txt) {
					var txt = (txt !== undefined) ? txt:"*Документы";

					Page.ACC_doc_status.style.transform = "rotate(0deg)";
					Page.ACC_document.methods.deactivate();
				}
			},
		},

		base_form_div: {
			id: "domain_base_form_div",
			tag: false,
			class: false,

			attributes: {
			}
		},

		base_form_input: {
			id: "domain_base_form_input",
			tag: false,
			class: false,

			attributes: {
				onkeyup: function () {
					if (Page.is_attention !== false) {this.methods.uninstal_attention();}

					if (this.value.length >= 2) {Page.base_form_submit.methods.submit_active();}
					else {Page.base_form_submit.methods.submit_deactive();}
				},
			},

			methods: {
				uninstal_attention: function() {
					document.body.removeChild(Page.is_attention);
					Page.is_attention = false;
				},
			}
		},

		base_form_submit: { 
			id: "domain_base_form_submit",
			tag: false,
			class: false,

			attributes: {
				onclick: function() {
					event.preventDefault();
					if (!Page.submit_activated) {return false;}
					
					else {
						Page.click_animation(Page.base_form_submit); 
						this.methods.submit_click(event);
					}
				}
			},

			methods: {
				submit_active:  function() {
					if (!Page.submit_activated) {
						Page.base_form_submit.style.pointerEvents   = 'auto';
						Page.base_form_submit.style.backgroundColor = 'rgb(40, 116, 166)';
						
						Page.submit_activated = true;
					}

					return Page.submit_activated;
				},

				submit_click: function(event) {
					let value   = Page.base_form_input.value,
						keyCode = event.keyCode,
						self    = (this.methods) ? this.methods:this;

					if (Page.domain_result) {self.remove_domain_result();}

					if (Page.is_url(value)) {
						var status;

						if (Math.floor(Math.random() * 10) > 5) {status = true;}
						else {status = false;}

						self.domain_status(status, value);
					}

					else {
						self.submit_deactive();
						Page.attention(value + " - неправильный формат домена.");
					}
				},

				submit_deactive: function() {
					if (Page.submit_activated) {
						Page.base_form_submit.style.pointerEvents   = 'none';
						Page.base_form_submit.style.backgroundColor = 'rgb(71, 71, 71)';	
						Page.base_form_submit.style.backgroundColor = 'rgba(40, 116, 166, 0.2)';

						Page.submit_activated = false;	
					}

					return Page.submit_activated;
				},

				domain_status: function(bool, value) {
					let text      = "Домен " + value + " - ",
						prise     = (Math.floor(Math.random() * 100) + 38) + "₽",
						color     = bool ? "SeaGreen":"Tomato",
						status    = bool ? "свободен.":"занят.",
						bye_state = bool ? "Купить за " + prise:"Попробуйте снова.",
						message   = text + status;

					var elem = document.createElement("p");
					elem.addEventListener('click', 
						function(event){
							return Page.base_form_status.methods.domain_status_p_click(event, bool);
						}
					)

					Page.base_form_status.innerHTML = message;
					Page.base_form_status.appendChild(elem);

					elem.style.color = color;
					elem.innerHTML   = bye_state;

					Page.domain_result = elem;
					return elem;
				},

				remove_domain_result: function() {
					Page.base_form_status.removeChild(Page.base_form_status.firstChild);
						
					Page.base_form_status.innerHTML = Page.status_basic_text;
					Page.domain_result = false;

					return Page.domain_result;
				},

			}
		},

		base_form_status: {
			id: "domain_base_form_domain_status",
			tag: false,
			class: false,

			attributes: {
			},

			methods: {
				domain_status_p_click: function(event, bool) {
					var target = event.target;

					function timeout(func) {setTimeout(function() {eval(func)}, 10);}
					Page.click_animation(target, 'recolor');
					
					if (bool) {timeout("alert('Переход временно не доступен')");}

					else {
						Page.base_form_input.value = Page.base_form_input.value.split('.')[0] + '.';
						timeout('Page.base_form_submit.methods.remove_domain_result()');
					}
				}
			}
		},

		body: {
			id: false,
			tag: "body",
			class: false, 

			attributes: {
				onscroll: function(event, topY) {
					var top = Page.scrollTop();

					if (Page.is_attention !== false) {
						Page.is_attention.style.top = top;
					}

					Page.acc_create_page[0].style.top = (eval(top.split("px")[0]) + 100) + 'px';
				}
			},
		},

		sentence_div_top: {
			id: "top_Sentence",
			tag: false,
			class: false,

			attributes: {
			}
		},

		sentence_div_bot: {
			id: "bottom_Sentence",
			tag: false,
			class: false,

			attributes: {
			}
		},

		sentence_icon: {
			id: false,
			tag: false,
			class: "sentence_icons",

			attributes: {
				onmouseout:  function() {
					Page.sentence_div.style.visibility = 'hidden';
					Page.sentence_div.style.display    = 'none';
				},
				
				onmouseover: function() {
					var target   	 = event.target,
						top_id		 = 'top_icons_line',
						parent       = target.parentElement,
						line         = parent.parentElement.id,
						hidden_text  = parent.getElementsByTagName('h3')[0],
						text  		 = (hidden_text) ? hidden_text.innerHTML:'Текст недоступен';
					
					Page.sentence_div = (line === top_id) ? Page.sentence_div_top:Page.sentence_div_bot;

					Page.sentence_div.innerHTML        = text;
					Page.sentence_div.style.visibility = 'visible';
					Page.sentence_div.style.display    = 'inline-block';
				}
			},
		},

		special_offer: {
			id: "special_offer",
			tag: false,
			class: false,

			attributes: {
				onmouseout: function() {
					this.style.transform = 'rotateY(-15deg)';
					this.style.filter    = 'hue-rotate(180deg)';				
				},

				onmouseleave: function() {
					this.style.transform = 'none';
					this.style.filter    = 'none';
				},

				onclick: function() {
					Page.attention("Ваш сеанс превысил 24 часа.");
				}
			},
		},

		logo: {
			id: false,
			tag: false,
			class: 'logo',

			attributes: {
			},
		},

		MainDiv: {
			id: false,
			tag: false,
			class: 'MainDiv',

			attributes: {
			},
		},
	},


	__init__: function() {
		/*  function __init__ class Page.
			check window width and include css style.

		*/

		let width = screen.width,
			size  = (width >= 910) ? "main_size":"other_size",
			style = 'content/styles/' + size + '.css',
			link  = document.createElement("link");
		
		link.href = style;
		link.rel  = "stylesheet";
		link.type = "text/css";

		document.head.appendChild(link);

		Page.submit_activated   = false
		Page.is_attention       = false
		Page.domain_result      = false
		Page.status_basic_text  = "Введите имя домена с кодом страны";
	},

	onload: function() {
		/* Method onload class Page.
			desription: 
				parse and preset page elems use Page Elem array
		
		*/

		for (var n in this.elems) {Page.load_element(n);}
	},

	load_element: function(key) {
		let elem = this.elems[key],
			resp = this.find_element_or_elements(elem);

		if (resp !== false) {Page[key] = resp;}
		else {return null;}

		if (Page[key] instanceof Array) {
			for (var num in Page[key]) {this.set_elem_Attributes(Page[key][num], elem);}
		}
		else {this.set_elem_Attributes(Page[key], elem);}
	},

	set_elem_Attributes: function(elem, diction) {
		/*  Method set_elem_Attributes class Page.
				set_elem_Attributes: 
					varibles:
						required:
							elem 	- HTML elem - elem from documen for preset;
							diction - Array     - Array from Page.Elems with some elem data;
						
					return:
						none.

					desription: 
						use preset from Page.elems['elem name'] Array for set document elemnt.
		*/

		let attributes = diction.attributes,
			methods    = diction.methods;

		for (var att in attributes) {
			elem[att]   = attributes[att];
		}

		elem.methods = (methods) ? methods:null;
	},

	find_element_or_elements: function(element) {
		/*  Method find_element_or_elements class Page.
				varibles:
					reqiered:
						element - Array - object from Page.elems.
		
				return:
					method getBy results;

				desription: 
					parse Elem Array data(id, tag, class) from Page.elems, 
					if data != null use this for find elem from document.
					
		*/

		for (var n in element) {
			if (n === 'id' || n === 'class' || n === 'tag') {
				let response = element[n];

				if (response) {
					var value  = Page.getBy(n, response),
						result = (value.length !== 0) ? value:false;
					
					break;
				}
			}
		}

		return result;
	},


	getBy: function(key, val){
		/*  Method getBy class Page.
				varibles:
					reqiered:
						key - string - id name of element(class\id\tag)
						val - string - element id.
		
				return:
					if data have class or tag:
						Array with HTMLelems.
					else:
						HTMTelement. 
					
					*from document.

				desription: 
					find elements with use val.
					
		*/

		var formulas = {
			id: function(id) {
				return document.getElementById(id);
			},

			className: function(id) {
				return Array.prototype.slice.call(document.getElementsByClassName(id));
			},

			tag: function(id) {
				return Array.prototype.slice.call(document.getElementsByTagName(id));
			},
		};

		if (key === 'class') {key ='className';}
		return formulas[key](val);
	},
	
	click_animation: function(elem, style, resize_index) {
		/* Method click_animation class Page.
				varibles:
					required: 
						elem - HTMLelement - element to animate.
					
					optional:
						style       - string 
							default - 'resize'  - use for standart click animation;
									- 'recolor' - use for set grey element backgrounColor.

						resize_index - Array
							format - [
								number1 - element clicked width; 
								number  - element clicked heigth; 
							]

				return:
					none.

				desription: 
					animate HTMLelement from document.

		*/

		var style 		 = (style === undefined) ? 'resize':style,
			resize_index = (resize_index === undefined) ? [0.97, 0.94]:resize_index,
			rect 		 = elem.getBoundingClientRect(),
			colr 		 = elem.style.color;

		function reSize(play){
			if (play) {
				elem.style.width  = rect.width  * resize_index[0] + 'px';
				elem.style.height = rect.height * resize_index[1] + 'px';

				setTimeout(function() {return reSize(false);}, 100);
			}
			else {
				elem.style.width = rect.width + 'px';
				elem.style.height = rect.height + 'px';			
			}
		}

		function reColor(play) {elem.style.color = 'grey';}

		var animations = {
				resize:  reSize,
				recolor: reColor
			},
			main_f     = animations[style];

		main_f(true);
	},

	is_url: function(val) {
		/*  Method is_url class Page.
				varibles:
					required: 
						val - string - some sting.

				desription: 
					parse val and return boolean (is val url or not).

		*/

  		var pattern = new RegExp(
  			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
  			'((\\d{1,3}\\.){3}\\d{1,3}))'+
		  	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
		  	'(\\?[;&a-z\\d%_.~+=-]*)?'+ 
		  	'(\\#[-a-z\\d_]*)?$','i');
  		
  		return pattern.test(val);
	},

	attention: function(text, bg) {
		/*	Method attention class Page.
				varibles:
					optional:
						text - sting  - string for inner in attention element;
						bg   - string - string with css color format for attention backgrounColor.
						
				return:
					Created HTMLelement.

				desription: 
					create in visible page top special element with some information.
				
		*/

		var text = (text !== undefined) ? text:"",
			bg   = (bg !== undefined) ? bg:null,
			elem = document.createElement('div'),
			body = this.body[0],
			rect = body.getBoundingClientRect(),
			top  = Page.scrollTop();

		if (Page.is_attention) {body.removeChild(Page.is_attention);}
		if (bg) {elem.style.backgroundColor = bg;}
		
		elem.style.top    = top;
		elem.className    = "Attention";
		elem.style.width  = Page.MainDiv[0].getBoundingClientRect().width + 'px';
		elem.id           = "NowAttention"
		elem.style.width  = rect.width;

		body.appendChild(elem);
		elem.innerHTML = text;
		
		Page.is_attention = elem;
		return Page.is_attention;
	},

	scrollTop: function() {
		/*	Method scrollTop class Page.
				return:
					string - scroll top POS in px.

				desription: 
			find scroll top position in many browsers;				
		*/

		var scrollY = (window.scrollY) ? window.scrollY:0,
			rect    = Page.body[0].getBoundingClientRect(),
			result  = Math.max(scrollY, window.pageYOffset, rect.top);
		
		return result + 'px';
	}
}


window.onload = function() {
	Page.__init__();
	Page.onload();
	
	if (!!document.documentMode){IE_preset();}		
};

function IE_preset() {
	Page.logo.forEach(
		function(logo) {
			var img      = logo.getElementsByTagName('img')[0],
				new_logo = document.createElement('p'),
				fSize    = img.getBoundingClientRect().width;

			logo.removeChild(img);

			new_logo.innerHTML = "ДЖИНО";
			new_logo.style.fontSize  = '1.3em';
			new_logo.style.verticalAlign = 'middle';

			logo.insertBefore(new_logo, logo.firstChild);
		}
	);

	window.onscroll = Page.body[0].onscroll;
}	
