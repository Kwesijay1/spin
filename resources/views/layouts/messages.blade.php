@if(count($errors)>0)
    @foreach($errors->all() as $error)
        <div class="alert alert-danger d-flex align-items-center bg-danger text-white" role="alert">
            <svg class="bi bi-x-circle-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>
            </svg>
            <div class=" mx-2 text-white">
                {{$error}}
            </div>
            <button type="button" class="btn-close mx-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endforeach
@endif

@if(session('success'))
    <div class="alert alert-success d-flex align-items-center bg-success text-white" role="alert">
        <svg class="bi bi-check-circle mx-2 text-white" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"/>
        </svg>
        <div class=" mx-2 text-white">
            {{session('success')}}
        </div>
        <button type="button" class="btn-close mx-2" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

@endif

@if(session('error'))
    <div class="alert alert-danger d-flex align-items-center bg-danger text-white" role="alert">
        <svg class="bi bi-x-circle-fill " width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>
        </svg>
        <div class=" mx-2 text-white">
            {{session('error')}}
        </div>
        <button type="button" class="btn-close mx-2" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

@if(session('warning'))
    <div class="alert alert-warning d-flex align-items-center bg-warning" role="alert">
        <svg class="bi bi-exclamation-diamond  text-dark" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/>
            <path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>
        </svg>
        <div class=" mx-2">
            {{session('warning')}}
        </div>
        <button type="button" class="btn-close mx-2" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
