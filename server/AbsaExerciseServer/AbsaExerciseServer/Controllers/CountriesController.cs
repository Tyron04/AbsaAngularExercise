using AbsaExerciseServer.Filters;
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
    [AuthorizationFilter]
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

        [HttpPost]
        public void Post(Country country)
        {
            _countryRepository.AddCountry(country);
        }
    }
}
