package com.bolsadeideas.springboot.backend.apirest.models.services;
import java.util.List;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
public interface IClienteService {

	public List<Cliente> findAll(); // READ
	
	public Cliente save(Cliente cliente); // CREATE 
	
	public void deleteC(Long id); // DELETE
	
	public Cliente findById(Long id); // find by ID
}
