using Server.Domain;
using Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AbsaExerciseServer.Controllers
{
  public class CountriesController : ApiController
  {
    private ICountryRepository _countryRepository;
    public CountriesController()
    {
      _countryRepository = new CountryRepository();
    }

    [HttpGet]
    public List<Country> Get()
    {
      return _countryRepository.GetCountries();
    }

    [HttpGet]
    public string Get(int id)
    {
      return "value";
    }

    [HttpPost]
    public void Post(Country country)
    {
      _countryRepository.AddCountry(country);
    }

    [HttpPut]
    public void Put(int id, [FromBody]string value)
    {
    }

    [HttpDelete]
    public void Delete(int id)
    {
    }
  }
}
