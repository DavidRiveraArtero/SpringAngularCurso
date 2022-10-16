package com.bolsadeideas.springboot.backend.apirest.models.services;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
public interface IClienteService {

	public List<Cliente> findAll(); // READ
	
	public Page<Cliente> findAll(Pageable pageable); // READ
	
	public Cliente save(Cliente cliente); // CREATE 
	
	public void deleteC(Long id); // DELETE
	
	public Cliente findById(Long id); // find by ID
}
