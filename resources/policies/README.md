# IAM and Bucket Policies

This folder keeps all the changes to the Lambda inline policy and Landing area bucket policy

## Landing area Bucket Policy


Console users should only allow READ-ONLY regardless whether they are basic or admin users. The following actions will be denied: 

* Object creation (manually uploading a new file anywhere in the bucket);

* Object deletion (manually deleting an existing anywhere in the bucket);

* Object overwriting or copy (manually overwriting a file with the same name or making a copy of it anywhere in the bucket);

* Object renaming (manually renaming an existing file in the bucket)

We also also include the inability to DELETE the bucket itself.

Note that the Lambda function should preserve WRITE access (PutObject) as well as DELETE rights (later used to removed the files moved across the consumer bucket)