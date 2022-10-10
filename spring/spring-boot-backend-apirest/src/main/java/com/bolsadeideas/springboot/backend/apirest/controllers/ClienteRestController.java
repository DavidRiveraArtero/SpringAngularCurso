package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200"}) // CON EL CORS ORIGIN LE DAMOS ACCESO A ESE DOMINIO
@RestController // ES EL DECORADOR DE LA CLASE PARA DECIRLE QUE ES UN CONTROLADOR REST
@RequestMapping("/api") // CON ESTO CREAREMOS LAS URL O ENDPOINTS

public class ClienteRestController {
	
	@Autowired // PARA PODER HACER LA INJECCION NECESITAMOS ESTE DECORADOR
	private IClienteService clienteService;
	
	// READ ALL CLIENTE
	@GetMapping("/clientes") // /api/cliente esto seria un endpoint 
	public List<Cliente> index(){
		return clienteService.findAll();
	}
	
	// READ ONE CLIENT
	@GetMapping("/clientes/{id}")  
	public ResponseEntity<?> show(@PathVariable Long id) { // @PathVariable es la anotación que nos sirve dentro de Spring framework para configurar variables dentro de los propios segmentos de la URL
		
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		System.out.println(response);
		try {
			cliente = clienteService.findById(id);
		}catch(DataAccessException e) {
			// ERROR POR BASE DE DATOS
			response.put("mensaje", "Error en realizar la consulta");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		// ERROR CLIENTE NO ENCONTRADO
		if(cliente == null) {
			
			response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existte en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			
		}
		// TODO CORRECTO
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK); 
	}
	
	// CREATE CLIENT
	@PostMapping("/clientes")
	public ResponseEntity<?> create(@RequestBody Cliente cliente) { // @Request body para decirle que la peticion estara dentro del body
		Cliente clienteNew = null;
		Map<String, Object> response = new HashMap<>();
		try {
			clienteNew = clienteService.save(cliente);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error en realizar el insert");
			response.put("catch", e.getLocalizedMessage().concat(":").concat(e.getMostSpecificCause().toString()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "Usuario creado con exito");
		response.put("cliente", clienteNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	// DELETE CLIENT
	@DeleteMapping("/clientes/{id}")

	public ResponseEntity<?> deleteC(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			clienteService.deleteC(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al borrar al cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "Cliente borrado con exito");
		return new ResponseEntity<Map<String, Object>>(response,HttpStatus.OK);
		
		
	}
	
	// UPDATE CLIENTE
	@PutMapping("/clientes/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<?> updateC(@RequestBody Cliente cliente, @PathVariable Long id) {
		
		Cliente clienteActual = clienteService.findById(id);
		Cliente clienteUpdate = null;
		Map<String, Object> response = new HashMap<>();
		
		if(clienteActual == null) {
			response.put("mensaje", "El cliente con ID: ".concat(clienteActual.getId().toString()).concat(" no existe"));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			clienteActual.setApellido(cliente.getApellido());
			clienteActual.setNombre(cliente.getNombre());
			clienteActual.setEmail(cliente.getEmail());
			
			clienteUpdate = clienteService.save(clienteActual);
			if(clienteActual.getNombre() == "") {
				response.put("mensaje", "Error se necesita el campo nombre para actualizar");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}
			
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al actualizar los datos del usuario");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente fue actualizado");
		response.put("cliente", clienteUpdate);
		
		return new ResponseEntity<>(response, HttpStatus.OK) ;
	}
	
	
	
}
