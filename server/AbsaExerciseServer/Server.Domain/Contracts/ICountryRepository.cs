using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Domain
{
  public interface ICountryRepository
  {
    List<Country> GetCountries();

    void AddCountry(Country country);
  }
}
