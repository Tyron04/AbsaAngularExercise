using Server.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Repository
{
  public class CountryRepository:ICountryRepository
  {
    private const string _TableName = "countries";

    protected Mongo<Country> _countries;

    public Mongo<Country> Countries
    {
      get
      {
        if (_countries == null)
        {
          _countries = new Mongo<Country>(_TableName);
        }
        return _countries;
      }
    }

    public void AddCountry(Country country)
    {
      Countries.Add(country);
    }

    public List<Country> GetCountries()
    {
      return Countries.GetAll();
    }

    
  }
}
