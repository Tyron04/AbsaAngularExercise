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
    [RoutePrefix("api/countries")]
    public class CountriesController : ApiController
    {
        private ICountryRepository _countryRepository;
        public CountriesController()
        {
            _countryRepository = new CountryRepository();
        }

        [AuthorizationFilter]
        [HttpGet]
        public List<Country> Get()
        {
            return _countryRepository.GetCountries();
        }

        [Route("add")]
        [HttpPost]
        public void Post(Country country)
        {
            if(country == null)
            {
                ResponseMessage(new HttpResponseMessage(HttpStatusCode.InternalServerError));
                return;
            }
            _countryRepository.AddCountry(country);
        }

        [HttpPost]
        [Route("create")]
        public void Create()
        {
            if (_countryRepository.GetCountries().Count == 0)
            {
                _countryRepository.AddCountry(new Country
                {
                    Id = 1,
                    Name = "South Africa"
                });
                _countryRepository.AddCountry(new Country
                {
                    Id = 2,
                    Name = "Botswana"
                });
                _countryRepository.AddCountry(new Country
                {
                    Id = 3,
                    Name = "Namibia"
                });
                _countryRepository.AddCountry(new Country
                {
                    Id = 4,
                    Name = "Zimbabwe"
                });
                _countryRepository.AddCountry(new Country
                {
                    Id = 5,
                    Name = "Zambia"
                });
            }
        }
    }
}
