package com.blog.app.apis.controllers;

import com.blog.app.apis.payloads.*;
import com.blog.app.apis.services.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	
	@Autowired
    private UserService useService;
	
	//Add User
	@PostMapping("/")
    public ResponseEntity<UserDto> createUser(@Valid  @RequestBody UserDto userDto){
	UserDto createUserDto= this.useService.createUser(userDto);
	
	return new ResponseEntity<>(createUserDto,HttpStatus.CREATED);
	
}
	
	//Update User
	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable Integer userId){
		UserDto updatedUser=this.useService.updateUser(userDto, userId);
		return new ResponseEntity<>(updatedUser,HttpStatus.OK);
	}
	
	//Delete User

	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId){
		this.useService.deleteUser(userId);
		return new ResponseEntity<ApiResponse>( new ApiResponse("user deleted SuccesFully",true),HttpStatus.OK);
	}
	
	
	//Find all User
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers(){
		
		return ResponseEntity.ok(this.useService.getAllUsers());
		
	}
	
	
	// Get User by Id
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId){
				return ResponseEntity.ok(this.useService.getUserById(userId));
	}

}
