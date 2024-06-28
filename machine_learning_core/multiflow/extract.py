import sys
import zipfile
import os

def print_progress_bar(iteration, total, length=50):
    percent = ("{0:.1f}").format(100 * (iteration / float(total)))
    filled_length = int(length * iteration // total)
    bar = '█' * filled_length + '-' * (length - filled_length)
    print(f'\r|{bar}| {percent}% Complete', end="\r")
    if iteration == total:
        print()

def extract(zip_file, target_dir):
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        members = zip_ref.namelist()
        total_members = len(members)
        for i, member in enumerate(members, start=1):
            filename = os.path.basename(member)
            if not filename:
                continue
            source = zip_ref.open(member)
            target = open(os.path.join(target_dir, filename), "wb")
            with source, target:
                target.write(source.read())
            print_progress_bar(i, total_members)

if __name__ == "__main__":
    zip_file = sys.argv[1]
    target_dir = sys.argv[2]
    extract(zip_file, target_dir)