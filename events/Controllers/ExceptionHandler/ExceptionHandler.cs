using Events.Models.AppError;
using System;

namespace Events.Controllers.ExceptionHandler
{
    public static class ExceptionHandler
    {
        public static AppError GetCode(Exception ex)
        {
            var type = ex.GetType().ToString();
            string innerException = ex.InnerException != null ? ex.InnerException.Message : "";
            string message = ex.Message;

            if (type.Contains("RecordAlreadyExistsException"))
            {
                return AppError.DbRecordAlreadyExists;
            }

            return AppError.NotSpecified;

        }
    }
}
