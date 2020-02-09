using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models.AppError
{
    public enum AppError
    {
        None = 0,

        DbRecordNotFound = 20,

        DbRecordAlreadyExists = 21

    }
}
