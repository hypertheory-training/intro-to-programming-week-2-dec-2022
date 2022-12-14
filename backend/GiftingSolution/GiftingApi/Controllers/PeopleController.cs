﻿

using Microsoft.AspNetCore.Authorization;

namespace GiftingApi.Controllers;

[ApiController]
public class PeopleController : ControllerBase
{

    private readonly ICatalogPeople _personCatalog;

    public PeopleController(ICatalogPeople personCatalog)
    {
        _personCatalog = personCatalog;
    }

    [HttpGet("/people/{id:int}")]
    public async Task<ActionResult<PersonItemResponse>> GetPersonById(int id)
    {
        PersonItemResponse? response = await _personCatalog.GetPersonByIdAsync(id);
        if (response is null)
        {
            return NotFound();
        }
        else
        {
            return Ok(response);
        }
    }

    [HttpPost("/people")]
    public async Task<ActionResult<PersonItemResponse>> AddPerson([FromBody] PersonCreateRequest request)
    {
        // Validate the request.
     
        // if it's valid - do the work (add it to our database) 
        // it it is NOT valid, you send a 400 (Bad Request)
        // return a 201 Created
        // Location Header (TODO)
        // And a copy of the new thing you created.

        PersonItemResponse response = await _personCatalog.AddPersonAsync(request);
        return StatusCode(201, response);
    }


    // GET /people
    [HttpGet("/people")]
    public async Task<ActionResult<PersonResponse>> GetAllPeople()
    {
        await Task.Delay(3000); // wait three seconds.
        PersonResponse response = await _personCatalog.GetPeopleAsync();
        return Ok(response); 
    }
}
