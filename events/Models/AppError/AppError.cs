using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models.AppError
{
    public enum AppError
    {
        None = 0,

        NotSpecified = 1,

        DbRecordNotFound = 20,

        DbRecordAlreadyExists = 21,

        DbRecordCanNotBeDeletedBecauseItIsInUse = 22

    }
}
